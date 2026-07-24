# Cohort Webpage

Static cohort profile gallery for the team formation activity.

## Run

Open `index.html` in a browser.

No install step or dev server is required.

## Add Your Card

Edit `data/learners.js` and add one object to `window.cohortProfiles`.

Most learner cards are already listed with `name`, `username`, and `genMate`.
Find your own object and replace the blank answers.

Use `roleIntent: "leader"` if you want to volunteer as a Team Leader. Team
Leader cards must include the extra `leaderAnswers` object.

Use `roleIntent: "member"` if you want to join a team as a Team Member. Member
cards should set `leaderAnswers: null`.

Keep answers specific, respectful, and useful for team formation.

## Git and GitHub Workflow

The webpage includes a beginner-friendly contribution guide at the bottom of
`index.html`.

Short version:

1. Clone or fork the repository.
2. Create a branch, for example `git checkout -b add-05-faii-card`.
3. Edit only your object in `cohort-webpage/data/learners.js`.
4. Preview `cohort-webpage/index.html` in a browser.
5. Check your work with `git status` and `git diff`.
6. Commit with a clear message.
7. Push your branch and open a pull request.
