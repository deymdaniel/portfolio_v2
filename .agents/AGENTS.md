# Workspace Rules & Guidelines

Welcome to the Daniel Biacan III Portfolio repository. This document defines the architecture, content-management strategy, and developer guidelines for building on this codebase.

---

## 1. Content Management Strategy (Headless CMS)

All core textual and project media content has been migrated from the static config file to **Sanity.io headless CMS**.

* **Project ID**: `k9sjfd4b`
* **Dataset**: `production`
* **API Client**: Located at [src/lib/sanity.js](file:///Users/danielbiacan/Desktop/portfolio_v2/src/lib/sanity.js). Exports the `client` instance and `urlFor(source)` image URL helper.

### Schema Structure (`studio/schemaTypes/`)
* `personalInfo`: Name, Title, Email, Location, Resume PDF (file asset).
* `about`: Main description text, skills array.
* `social`: Social link URLs (GitHub, LinkedIn, Instagram, Facebook).
* `project`: Showcase projects containing title, description, screenshot image, tech tags, liveUrl, githubUrl, an optional `videoUrl` for walkthroughs, and `order` number for sorting.

---

## 2. Code Architecture & Component Rules

### Data Loading Flow
* All CMS content is fetched inside the main `src/App.jsx` component on mount and passed down as props to children layout sections (`Header`, `Hero`, `About`, `Projects`, `Contact`, `Footer`).
* Do NOT run separate API fetch queries inside individual child components; always propagate CMS state from the root of the app.

### Fallback Content
* To ensure the site never breaks if the CMS is loading or the fetch query fails, all child components must reference fallback values from the local [src/config.js](file:///Users/danielbiacan/Desktop/portfolio_v2/src/config.js) file.
* Example: `const name = personalInfo?.name || config.name;`

### Theme & Colors (Strict Boundary)
* **Rule**: Styling, colors, and layout configurations must remain code-based.
* Do NOT attempt to migrate visual colors, styling definitions, or Tailwind class strings to Sanity schemas. These should stay configured in the local source code (CSS / Tailwind definitions / `config.colors` in JS).

### Image Rendering
* Always use the `urlFor` image helper in [src/lib/sanity.js](file:///Users/danielbiacan/Desktop/portfolio_v2/src/lib/sanity.js) to crop and size Sanity images for performance:
  ```javascript
  import { urlFor } from "../lib/sanity";
  const imageUrl = project.image ? urlFor(project.image).width(800).url() : "";
  ```

### Video Walkthroughs
* Projects support YouTube walkthroughs. If a project has `videoUrl`, a "Watch Walkthrough" button will render, which opens a responsive YouTube `<iframe>` modal.

---

## 3. Development Commands

### Frontend App
* Run dev server: `npm run dev`
* Run build check: `npm run build`
* Run eslint rules check: `npm run lint`

### Sanity Studio
* Run studio locally: `cd studio && npm run dev`
* Deploy studio dashboard to the cloud: `cd studio && npx sanity deploy`

---

## 4. Optimization & Tooling (Graphify)

* **Knowledge Graph**: A pre-built knowledge graph of the codebase exists in `graphify-out/graph.json`.
* **Rule**: When answering questions about the repository structure, components, or files, agents should check if `graphify-out/graph.json` exists and use the `graphify query` CLI or the `graphify` MCP server tools to extract target context instead of reading files one-by-one. This reduces context clutter and saves up to 9.2x on token consumption.
