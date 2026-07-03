# Portfolio Design System & Guidelines (Brutalist / Anti-Design)

This document defines the visual identity, spacing constraints, and design philosophy of the Daniel Biacan III Portfolio website. Future developers and AI agents must strictly adhere to these rules when modifying the UI, adding components, or building new features.

---

## 1. Core Philosophy: Brutalist / "Balenciaga" Anti-Design
The website rejects conventional modern web templates (e.g., standard SaaS layouts, rounded buttons, drop shadows, gradients, and soft cards) in favor of a raw, confrontational, high-fashion editorial aesthetic.

* **Contrast**: Extreme scale differences (e.g., giant display titles next to tiny 9px metadata).
* **Flatness**: No shadows, no gradients, no borders unless absolutely necessary for input fields. Everything is flat color blocks.
* **Instant Navigation**: Smooth scroll is intentionally disabled (`scroll-behavior: auto`). Page jumps must be instant and raw.
* **Minimal Margin/Gaps**: Elements sit flush, with margins pushed as close to the browser edges as possible.

---

## 2. Typography
A dual-font system is configured in `src/App.css` and imported in `index.html`. 

> [!WARNING]  
> **No Monospace Fonts**: Do not introduce monospace fonts (e.g., Fira Code, JetBrains Mono) under any circumstances.

* **Display Font (Headings)**: **Archivo** (Weights: `700`, `800`, `900`). Used in bold/black weights for giant, heavy all-caps section headers.
* **Body Font (Paragraphs, Labels, UI)**: **Inter** (Weights: `400`, `500`, `600`, `700`). Used for small uppercase metadata, form labels, and descriptions.

---

## 3. Color Palette
Colors are configured as custom CSS variables in the `@theme` block of `src/App.css` to allow seamless switching between light and dark modes:

| Variable | Light Mode | Dark Mode (Default) | Purpose |
| :--- | :--- | :--- | :--- |
| `--color-ground` | `#f0f0f0` | `#0a0a0a` | Global body background (soft gray / off-black) |
| `--color-ink` | `#000000` | `#ffffff` | Primary text and solid components |
| `--color-surface` | `#e8e8e8` | `#1a1a1a` | Secondary block canvas (e.g., image viewports) |
| `--color-muted` | `#999999` | `#666666` | Secondary labels, descriptions, subtitles |
| `--color-border-custom`| `#000000` | `#ffffff` | Standard bold border bounds |
| `--color-border-light` | `#cccccc` | `#333333` | Minimal border accents |

---

## 4. Grid & Layout Constraints
The site layout uses a **12-column grid** dynamically divided for asymmetry.

### Desktop View (lg:sticky sidebar)
* **Global Grid**: `lg:grid lg:grid-cols-12` in `App.jsx`.
* **Sidebar (Header)**: Spans 2 columns (`lg:col-span-2`). Sticks to the left of the viewport (`lg:sticky lg:top-0 lg:h-screen`). 
  - Contains vertical logo stacked dynamically (`Daniel` on row 1, `Biacan III` on row 2), desktop navigation buttons, theme switches, resume download link, and copyright footer.
* **Content Container**: Spans 10 columns (`lg:col-span-10 lg:col-start-3`).

### Mobile View (Stacked)
* **Sidebar Header**: Collapses into a fixed top bar (`fixed top-0 left-0 w-full z-50`) with an opaque background (`bg-ground`).
* **Menu**: Toggles a flat, full-width dropdown menu listing navigation, resume, theme toggle, and social links. No sliding drawers.
* **Main Content**: Stacks vertically beneath the top bar with a `pt-24` offset on the Hero section to prevent header overlap.

### Edge Margins & Paddings
* **Horizontal Padding**: Strictly capped at **`px-2 md:px-4`** across all main layout sections (`Header`, `Hero`, `About`, `Projects`, `Contact`, `Footer`). Do not widen.
* **Vertical Spacing**: Standardized section padding is `py-24 lg:py-32` to create dramatic vertical whitespace between contents.

---

## 5. UI Layout Rules (What NOT to do)

* **No Line Separators**: Do not add horizontal rules or divider borders (`border-t`, `border-b`, `divide-y`) between sections, list items, or menu blocks. Spacing and typography must do the grouping.
* **No Backdrop-Blur**: Header and dropdowns must remain completely flat and opaque using `--color-ground` directly.
* **Underline-Only Inputs**: Contact form input fields must be transparent with a bottom border only (`border-0 border-b border-border-light focus:border-ink`), avoiding solid boxes.
* **Watermarks**: Large background watermark index numbers (`001`, `01`, `02`, `03`) must stay subtle. Use:
  ```html
  <div className="absolute ... text-ink opacity-[0.05] dark:opacity-[0.1] pointer-events-none select-none">
  ```

---

## 6. Projects Section Media Guidelines
The media viewport in `Projects.jsx` is built as a uniform canvas to display mixed-aspect screenshots:

* **Viewport Box**: Sized at a constant height (`h-[280px]` mobile, `h-[340px]` tablet, `h-[380px]` desktop) with a background of `--color-surface`.
* **Centered Scaling**: Images must be rendered in full (uncropped) inside this box using `h-full w-auto object-contain`. Both landscape website screenshots and portrait mobile mockup screenshots fit inside this box centered, avoiding vertical shifting.
* **Slideshow Controls**: Toggles (`1 / 3` indicator and `NEXT IMAGE →`) sit outside the image area in a text-based toolbar *below* the box.
* **Click-to-Zoom Modal**: Clicking the active screenshot opens a fullscreen overlay modal showing only the raw, uncropped image at maximum viewport size (`max-w-[95vw] max-h-[95vh]`). There must be no border frames, closing banners, or header text. Clicking the backdrop outside the image closes it.
* **Video Walkthroughs**: Open in a custom brutalist popup modal (`fixed inset-0 bg-ground/95 p-4`) containing a clean header with a `CLOSE ×` button and a responsive `iframe` player. Video walkthroughs must never load inline inside the image viewport slot.
