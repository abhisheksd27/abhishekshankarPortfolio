# Portfolio update

Content reviewed on 1 November 2026. Final build and focused checks reconfirmed on 3 November 2026.

## Content

The reviewed baseline is in `shared/portfolio.json`. The React page and API share
`shared/portfolio.mjs`. Featured projects: UrbanPulse, Road Accident Prediction,
DevZone, PropertEase; ShopLakehouse is explicitly in progress. Descriptions reflect
inspected repository implementations, not verified production deployments.

The supplied resume was read and visually reviewed. It supplies Accenture's duties,
100+ recurring job fixes, Varcons internship, education scores, four course credentials,
and the downloadable PDF under `frontend/public/resume/`.

Public LinkedIn information supplies Google course dates/IDs and the Smart India
Hackathon achievement. Full LinkedIn access required sign-in. Existing Freelance,
Webstack Academy, and Google Cybersecurity entries were retained from the site's
public API; they were not independently reverified. Missing certificate dates and
verification URLs were not invented.

GitHub and LeetCode numbers are dated snapshots from 1 November 2026 in
`frontend/src/components/Activity.jsx`, not automatically refreshing statistics.
LeetCode: 326 solved, 178 easy / 139 medium / 9 hard; 53 active days and maximum
16-day streak in the past year. GitHub: 111 public repositories and 123 followers.

## Sources

- Resume supplied by the user: /Users/abhishekshankar/Downloads/abhishekshankar(resume).pdf
- https://github.com/abhisheksd27
- https://www.linkedin.com/in/abhishekshankar27/
- https://leetcode.com/u/ABHISHEKSHANKAR27/
- https://github.com/abhisheksd27/UrbanPulse
- https://github.com/abhisheksd27/Road-Accident-Prediction-model/tree/main/ASD_Modif
- https://github.com/abhisheksd27/ShopLakehouse/blob/main/docs/progress.md
- https://github.com/abhisheksd27/DevZone
- https://github.com/abhisheksd27/PropertEase

## Content loading and admin updates

Old database content has no section revision stamps and must not overwrite the new
reviewed baseline. Later admin saves stamp only the edited section. Both public and
admin reads return the effective merged content. The schema preserves project status,
highlights, next milestones, certificate details, and revision dates. Existing admin
edits preserve additional experience and education fields.

Deploy the frontend and backend changes together and include the repository's shared/
directory in both builds. No live database updates, Git push, or deployment was done.
The live frontend is on Vercel; its public API is on Render at
https://abhishek-portfolio-api.onrender.com.

## Checks

- `node --test shared/portfolio.test.mjs`: seven passing checks, with database calls
  mocked; no live data writes.
- Frontend production build succeeds.
- ESLint passes for the changed JavaScript/JSX files. Full repository lint still has
  pre-existing unused imports in legacy page components and a Dashboard hook warning.
- Browser review confirms all five projects, the in-progress badge, valid section
  anchors, and no console errors in the updated public page.

The initially edited standalone HTML folder was restored after the user supplied the
correct React project path. Temporary research and original-file backups are under
/tmp/abhishek-portfolio-review/.
