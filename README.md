# Watlington Sports & Social Club — website

Built with [Eleventy](https://www.11ty.dev/) (static site generator) and
[Decap CMS](https://decapcms.org/) (the editing panel at `/admin`), deployed on Netlify.

## How content editing works

- Content (What's On, price list, blog posts, gallery, etc.) lives as JSON files in
  `src/_data/`. You never need to touch these directly — the `/admin` panel edits them
  for you through a form-based interface.
- Photos live in `src/assets/img/`. The admin panel handles uploading and picking them.
- Every save through `/admin` commits directly to this repo's `main` branch, which
  triggers Netlify to automatically rebuild and redeploy the live site — usually live
  within a minute or two.

## One-time setup (do this once, after the repo is on GitHub)

1. **Connect the repo to Netlify**
   - Netlify → Add new site → Import an existing project → choose this GitHub repo.
   - Build command: `npm run build` (already set in `netlify.toml`, Netlify should
     detect it automatically).
   - Publish directory: `_site` (also already set).
   - Deploy — you'll get a `*.netlify.app` URL.

2. **Turn on Netlify Identity + Git Gateway** (this is what lets committee members log in)
   - In the Netlify site dashboard: Site configuration → Identity → Enable Identity.
   - Site configuration → Identity → Registration preferences → set to "Invite only"
     (so random people can't sign themselves up).
   - Site configuration → Identity → Services → Git Gateway → Enable Git Gateway.

3. **Update `admin/config.yml`**
   - Replace both `YOUR-NETLIFY-SITE.netlify.app` placeholders with your actual
     Netlify URL from step 1, then commit the change.

4. **Point your domain**
   - Once you're happy, repoint `watlingtonsportsandsocialclub.co.uk` DNS at Netlify
     (Netlify → Domain management → Add a domain), then update GoDaddy's DNS records
     to match what Netlify gives you.

5. **Invite editors**
   - Netlify → Site configuration → Identity → Invite users → enter each committee
     member's email. They'll get an email to set a password, then can log in at
     `yoursite.netlify.app/admin`.

## Local development (optional — for testing changes before pushing)

```bash
npm install
npm start          # builds and serves the site at http://localhost:8080
```

To test the `/admin` panel locally without needing Netlify Identity, run this in a
second terminal, then visit `http://localhost:8080/admin`:

```bash
npx decap-server
```

## Project structure

```
src/
  _data/          ← all editable content (JSON) — this is what /admin edits
  _includes/       ← (currently unused, reserved for future shared template pieces)
  assets/
    css/style.css  ← site styling
    img/           ← all photos and logos
  index.njk        ← the page template
admin/
  index.html       ← loads the Decap CMS admin panel
  config.yml       ← defines every editable field in the admin panel
.eleventy.js       ← Eleventy build configuration
netlify.toml       ← tells Netlify how to build and deploy the site
```

## Adding a new editable section later

If you want to add something new to the CMS (e.g. a fully separate "Events" area),
the pattern is:

1. Add a new JSON file in `src/_data/` with the content shape you want.
2. Reference it in `src/index.njk` with `{% raw %}{{ yourFileName.someField }}{% endraw %}`.
3. Add a matching entry under `collections:` in `admin/config.yml` so it shows up
   in the admin panel.
