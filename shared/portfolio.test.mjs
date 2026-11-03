import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PORTFOLIO_DATA as baseline, mergePortfolioData } from './portfolio.mjs';
import Portfolio from '../server/models/Portfolio.js';
import { getPortfolio, updatePortfolio } from '../server/controllers/portfolioController.js';

test('legacy API content cannot replace reviewed projects and work details', () => {
  const result = mergePortfolioData({projects: [{title: 'Old project'}], experience: []});
  assert.deepEqual(result.projects, baseline.projects);
  assert.equal(result.experience[0].company, 'Accenture');
  assert.equal(result.projects.find(p => p.title === 'ShopLakehouse').status, 'in-progress');
});

test('later admin changes affect only the saved section, including deliberate empty lists', () => {
  const result = mergePortfolioData({
    projects: [], contact: {email: 'updated@example.com'},
    education: [], sectionUpdatedAt: {projects: '2026-11-02', contact: '2026-11-02'},
  });
  assert.deepEqual(result.projects, []);
  assert.equal(result.contact.email, 'updated@example.com');
  assert.equal(result.contact.github, baseline.contact.github);
  assert.deepEqual(result.education, baseline.education);
});

test('missing, malformed, and stale revisions retain the baseline', () => {
  for (const value of [null, undefined, [], '<html>']) assert.deepEqual(mergePortfolioData(value), baseline);
  for (const date of ['invalid', '2026-10-01']) {
    assert.deepEqual(mergePortfolioData({projects: [], sectionUpdatedAt: {projects: date}}).projects, baseline.projects);
  }
  assert.deepEqual(mergePortfolioData({projects: 'wrong shape', sectionUpdatedAt: {projects: '2026-11-02'}}).projects, baseline.projects);
});

test('database schema preserves status, highlights, credentials, and revision stamps', async () => {
  const doc = new Portfolio({...baseline, sectionUpdatedAt: {projects: '2026-11-02'}});
  await doc.validate();
  const stored = doc.toObject({flattenMaps: true});
  const shop = stored.projects.find(p => p.title === 'ShopLakehouse');
  assert.equal(shop.status, 'in-progress');
  assert.equal(shop.nextSteps.length, 3);
  assert.equal(stored.experience[0].highlights.length, 4);
  assert.equal(stored.certification.find(c => c.credentialId === 'WOE75EBSP6JU').issued, 'January 2026');
  assert.equal(stored.sectionUpdatedAt.projects, '2026-11-02');
});

test('GET supplies reviewed content to both the public page and admin editor without writing', async t => {
  t.mock.method(Portfolio, 'findOne', () => ({lean: async () => ({projects: [{title: 'Legacy'}]})}));
  let response;
  await getPortfolio({}, {json: data => { response = data; }}, err => { throw err; });
  assert.deepEqual(response.projects, baseline.projects);
});

test('admin update stamps only submitted sections and returns the full effective portfolio', async t => {
  const updated = [{...baseline.projects[4], title: 'ShopLakehouse v2'}];
  t.mock.method(Portfolio, 'findOne', async () => new Portfolio({projects: []}));
  let saved;
  t.mock.method(Portfolio, 'findOneAndUpdate', async (_filter, update) => {
    saved = update.$set;
    return new Portfolio({projects: saved.projects, sectionUpdatedAt: {projects: saved['sectionUpdatedAt.projects']}});
  });
  let response;
  await updatePortfolio({body: {projects: updated}}, {json: data => {response = data;}}, err => {throw err;});
  assert.ok(Number.isFinite(Date.parse(saved['sectionUpdatedAt.projects'])));
  assert.equal(saved['sectionUpdatedAt.education'], undefined);
  assert.equal(response.projects[0].title, 'ShopLakehouse v2');
  assert.equal(response.projects[0].status, 'in-progress');
  assert.deepEqual(response.education, baseline.education);
});

test('first admin save creates a revision for the submitted section only', async t => {
  t.mock.method(Portfolio, 'findOne', async () => null);
  let created;
  t.mock.method(Portfolio.prototype, 'save', async function () { created = this; return this; });
  let response;
  await updatePortfolio({body: {contact: {email: 'first@example.com'}}}, {json: data => {response = data;}}, err => {throw err;});
  assert.ok(created.sectionUpdatedAt.get('contact'));
  assert.equal(response.contact.email, 'first@example.com');
  assert.deepEqual(response.projects, baseline.projects);
});
