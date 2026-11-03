const profiles = {
  github: "https://github.com/abhisheksd27",
  leetcode: "https://leetcode.com/u/ABHISHEKSHANKAR27/",
};
const difficulties = [
  { label: "Easy", count: 178, color: "#34d399" },
  { label: "Medium", count: 139, color: "#fbbf24" },
  { label: "Hard", count: 9, color: "#f87171" },
];

export default function Activity() {
  return (
    <section id="activity" className="section-wrapper">
      <div className="section-header">
        <span className="section-label">Coding Practice</span>
        <h2 className="section-heading">Engineering Activity</h2>
        <p className="section-subheading">Profile snapshot: <time dateTime="2026-11-01">1 November 2026</time>. Explore the profiles for the latest activity.</p>
      </div>
      <div className="profile-activity-grid">
        <article className="profile-activity-card">
          <div className="activity-heading"><h3>LeetCode</h3><a href={profiles.leetcode} target="_blank" rel="noopener noreferrer">View profile ↗</a></div>
          <div className="activity-main-stat"><strong>326</strong><span>problems solved</span></div>
          <div className="difficulty-list">
            {difficulties.map(item => <div className="difficulty-row" key={item.label}>
              <span>{item.label}</span><div className="difficulty-track" aria-hidden="true"><div style={{width: `${item.count / 326 * 100}%`, background: item.color}} /></div><strong style={{color: item.color}}>{item.count}</strong>
            </div>)}
          </div>
          <dl className="activity-stat-list"><div><dt>Global rank</dt><dd>458,141</dd></div><div><dt>Active days · past year</dt><dd>53</dd></div><div><dt>Max streak · past year</dt><dd>16 days</dd></div><div><dt>Total submissions</dt><dd>639</dd></div></dl>
          <p className="activity-footnote">286 Python3 problems · 40 MySQL problems</p>
          <p className="activity-footnote">6 badges, including Dynamic Programming I and the 50 Days Badge 2026.</p>
        </article>
        <article className="profile-activity-card">
          <div className="activity-heading"><h3>GitHub</h3><a href={profiles.github} target="_blank" rel="noopener noreferrer">View profile ↗</a></div>
          <div className="activity-main-stat"><strong>111</strong><span>public repositories</span></div>
          <dl className="activity-stat-list"><div><dt>Contributions · Jan–Nov 1, 2026</dt><dd>129</dd></div><div><dt>Followers</dt><dd>123</dd></div></dl>
          <div className="activity-repos">
            <a href={`${profiles.github}/UrbanPulse`} target="_blank" rel="noopener noreferrer"><strong>UrbanPulse ↗</strong><span>Data ingestion, processing, and warehouse modeling</span></a>
            <a href={`${profiles.github}/Road-Accident-Prediction-model/tree/main/ASD_Modif`} target="_blank" rel="noopener noreferrer"><strong>Road Accident Prediction ↗</strong><span>Academic machine learning and Flask application</span></a>
            <a href={`${profiles.github}/ShopLakehouse`} target="_blank" rel="noopener noreferrer"><strong>ShopLakehouse ↗ <span className="progress-badge">In progress</span></strong><span>E-commerce analytics platform under development</span></a>
          </div>
        </article>
      </div>
    </section>
  );
}
