# AtlasBuild CMS - Visual Design Guidelines & Tokens

This document specifies the exact interface restrictions, colors, font rules, and layout structures for generating screens in Google Stitch. Copy and paste this file into Stitch to maintain exact visual alignment.

---

## 1. Color Palette (Dark Obsidian & Safety Gold)

* **Base Layer**: `#0B0F17` (Deep Obsidian Dark)
  * *Usage*: Background page canvas color. Avoid high contrast pure black or white.
* **Surface Layer**: `#1E293B` (Sleek Slate Panel)
  * *Usage*: Cards, popup modal containers, and sidebar navigations.
* **Borders/Dividers**: `#334155` (Steel Plate Grey)
  * *Usage*: Card borders, table header dividers, and grid outlines.
* **Primary Accent**: `#F59E0B` (Amber Safety Gold)
  * *Usage*: Primary call-to-actions, active progress alerts, and brand highlights.
* **Secondary Accent**: `#0D9488` (Titanium Teal)
  * *Usage*: Success statuses, completed milestones, and download indicators.
* **Text Main**: `#F8FAFC` (Clean Ice White)
  * *Usage*: Main headers, body text inside panels, and labels.
* **Text Muted**: `#94A3B8` (Zinc Grey)
  * *Usage*: Date metrics, sub-labels, and metadata fields.

---

## 2. Typography

* **Headings**: `Outfit` font family. Bold weights, clean neo-geometric styling, uppercase structure for segment sub-titles.
* **Body Text**: `Inter` font family. Medium and Regular weights for legibility across dark backgrounds.
* **Monospace Info**: System monospace fonts for numerical data (EMR scores, budget metrics, square footage values).

---

## 3. UI Aesthetics & Effects

* **Glassmorphism Overlay**:
  * All cards and action models must utilize:
    * Background: `rgba(30, 41, 59, 0.6)`
    * Backdrop Filter: `blur(12px)`
    * Border: `1px solid rgba(51, 65, 85, 0.5)`
* **Borders & Corners**:
  * Rounded cards: `12px` border-radius.
  * Rounded buttons & input elements: `8px` border-radius.
* **Dynamic Animations**:
  * Hover transforms: Soft scale transforms (`scale(1.015)`) with ease transitions.
  * Milestone status transitions: Pulse glow indicators (amber/teal) indicating active workflow steps.

---

## 4. Layout Constraints

* **Page Sizing**: Standard 1280px-1440px desktop grid width bounds, full-width fluid layouts for admin panels.
* **Alignment**: Consistent vertical grid margins. Always align sidebars to the left edge with fixed 240px sizing.
* **Whitespace**: Maintain generous padding: `24px` inside cards, `48px` page margins.
