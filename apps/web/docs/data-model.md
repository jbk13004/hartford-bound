# Hartford Bound — Data Model

The site is driven entirely by Google Sheets. Each sheet is published as a CSV and
fetched at runtime (existing `csvBaseQuery` + RTK Query pattern). This document is the
contract: what each sheet (table) contains, how the tables relate, and how the app
assembles them into pages.

> **Status: guideline, not canonical.** This is a design to build toward, not a frozen
> spec. If the implementation surfaces a better structure, a missing column, or a
> relationship that doesn't hold up, change it — and update this doc to match. The
> principles below are what's load-bearing; the exact column list is negotiable.

## Design principles

1. **Edit-in-place CRUD.** Relationships are authored as comma-separated id lists in a
   column on the row you're already editing — not in separate junction tabs. You never
   leave the story you're working on to connect it to a map.
2. **One paste per image.** Every image is a Flickr photo. The curator pastes the Flickr
   **static image URL** (the `live.staticflickr.com/...jpg` address) into the relevant
   column. The app derives every size and the attribution link from that one string.
3. **Everything is an asset.** Stories, maps, exhibits, and archive items share the same
   conventions: a stable `id`, a historical year range, tags, and (optionally) a
   lat/lng. Consistency means the timeline and the homepage map can treat them uniformly.
4. **Derive, don't duplicate.** The timeline, the homepage map markers, decades, display
   colors, and reverse relationships are all computed in code from the fields below.
   Curators never hand-maintain them.

## Shared column conventions

These columns mean the same thing in every table that has them:

| Column | Type | Meaning |
| --- | --- | --- |
| `id` | slug | Stable kebab-case identifier (`addie-brown`). Used in URLs and in id-list columns elsewhere. **Never reuse or rename** — it's the foreign key. |
| `year_start` | integer | First year the asset covers. Drives timeline order and decade. |
| `year_end` | integer (optional) | Last year covered. Blank = single year / ongoing. |
| `dates_label` | text (optional) | Display override for fuzzy dates, e.g. `c. 1915 — present`. If blank, the app formats `year_start — year_end`. |
| `tags` | csv of tag ids | e.g. `migration, labor`. Shared vocabulary across all asset types. The **first** tag is the primary one and sets the asset's display color. |
| `lat`, `lng` | decimal (optional) | Location for the homepage interactive map. Omit to keep the asset off the map. |
| `*_image_url` / `*_url` | text | A Flickr static image URL, pasted directly. See "Flickr images". |

`tags` and the various `*_ids` columns are **multi-value**: comma-separated, whitespace
ignored, order preserved. Empty cell = no links.

---

## Tables

### `tags`
The controlled vocabulary. Replaces the old free-text `#TAG` strings, the per-asset
`variant`/`colorScheme` columns, and the `decade` column (decade is derived from
`year_start`).

| Column | Notes |
| --- | --- |
| `id` | slug, e.g. `migration` |
| `label` | display label, e.g. `Migration` |
| `theme` | top-level rollup: `race` \| `migration` \| `mobility` (or blank) |
| `color` | hex token, e.g. `#72B591`. An asset's color = its primary tag's color. |
| `description` | optional blurb |

### `stories`
| Column | Notes |
| --- | --- |
| `id`, `title`, `subtitle`, `excerpt` | excerpt is the card/teaser line |
| `year_start`, `year_end`, `dates_label` | shared convention |
| `lat`, `lng` | story's anchor on the homepage map |
| `tags` | shared convention |
| `map_ids` | csv of `maps.id` — **the story↔map relationship, authored here** |
| `hero_image_url` | Flickr static URL — the portrait/hero |

The story's **body lives in `story_blocks`**, not in this row.

### `story_blocks`
The rich body, one block per row. This replaces the old pipe-delimited `body` blob and
makes long-form editing approachable: add a row to add a paragraph or drop in a photo.

| Column | Notes |
| --- | --- |
| `story_id` | FK → `stories.id` |
| `sort_order` | integer; ascending order down the page |
| `type` | `text` \| `heading` \| `quote` \| `photo` |
| `text` | the paragraph/heading/quote text (blank for `photo`) |
| `image_url` | Flickr static URL (only for `type = photo`) |
| `caption` | optional caption (for `photo`) |

To reorder, change `sort_order` (leave gaps of 10 so you can insert between). To embed an
image mid-article, add a `photo` row with the order you want.

### `maps`
Individual historical map images — each gets its own detail page. (This is the canonical
map table; it absorbs the old `atlas.csv`.)

| Column | Notes |
| --- | --- |
| `id`, `title`, `subtitle` | |
| `description` | the "Historical Context" article text |
| `year_start`, `year_end`, `dates_label` | shared convention |
| `lat`, `lng` | what the map depicts — its marker on the homepage map |
| `tags` | shared convention |
| `collection_ids` | csv of `collections.id` — which landing groupings this map appears in |
| `image_url` | Flickr static URL — **the map scan itself** |

### `collections`
Curated thematic groupings of maps — the landing-page cards (e.g. "Routes and Roots").
Consolidates the old `maps.csv` cards into a clear grouping layer that sits above `maps`.

| Column | Notes |
| --- | --- |
| `id`, `title`, `subtitle`, `description` | |
| `cover_image_url` | Flickr static URL for the card |
| `tags` | optional |

Membership is authored on the `maps.collection_ids` side; the app builds the reverse
("maps in this collection") automatically.

### `exhibits`
| Column | Notes |
| --- | --- |
| `id`, `title`, `subtitle` | subtitle doubles as the intro line |
| `year_start`, `year_end`, `dates_label` | shared convention |
| `active` | `TRUE` / `FALSE` — highlighted in the selector |
| `lat`, `lng` | optional (if the exhibit is place-anchored) |
| `tags` | shared convention |
| `story_ids` | csv of `stories.id` — **exhibit↔story relationship** |
| `map_ids` | csv of `maps.id` — **exhibit↔map relationship** |
| `cover_image_url` | Flickr static URL |

The exhibit's panels live in `exhibit_panels`.

### `exhibit_panels`
The slideshow panels (the UI shows `PANEL 04 / 12` with prev/next). One row per panel.

| Column | Notes |
| --- | --- |
| `exhibit_id` | FK → `exhibits.id` |
| `sort_order` | integer; panel order |
| `label` | small kicker, e.g. `Part 1: The Arrival` |
| `title` | panel headline |
| `body` | panel paragraph |
| `image_url` | Flickr static URL |
| `caption` | optional |

The total panel count (`/ 12`) is derived by counting rows — never typed.

### `archive`
Browsable archive grid, folded in as a first-class asset using the shared conventions
(its own `image_url`, year range, and tags — it participates in the timeline and tag
filters like everything else).

| Column | Notes |
| --- | --- |
| `id`, `title` | |
| `category` | `photographs` \| `documents` \| `maps` \| `oral-histories` \| … |
| `year_start`, `year_end`, `dates_label` | shared convention |
| `tags` | shared convention |
| `image_url` | Flickr static URL — the **preview** shown in the archive grid |
| `download_url` | Google Drive **share** link — the downloadable original (scan / PDF / audio). See "Google Drive downloads". Blank = no download offered. |
| `description` | optional |

`image_url` (Flickr) and `download_url` (Drive) are two separate concerns: Flickr is the
on-page preview, Drive is the file you download. Either can be blank.

### `timeline_events` (optional)
The timeline is **derived** from every dated asset (see below). This sheet exists only for
context beats that are *not* assets — e.g. "1635 — Hartford Founded".

| Column | Notes |
| --- | --- |
| `id`, `year`, `title` | |
| `description` | optional |

---

## Flickr images

Every image column holds one Flickr static image URL, e.g. from this embed:

```html
<img src="https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg"
     width="1024" height="768" alt="...">
```

the curator pastes **`https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg`**.
That single string encodes everything the app needs:

```
https://live.staticflickr.com/{server}/{photoId}_{secret}_{size}.jpg
                               65535     53778710552 01f2058482  b
```

A helper (`shared/lib/flickr.ts`) parses it and can rebuild any size on demand:

```ts
// parseFlickrUrl(url) -> { server, photoId, secret, size }
// flickrSrc(parsed, 'q') -> 150px thumb   (atlas grid, related rails)
// flickrSrc(parsed, 'b') -> 1024px        (detail hero, map scan)
// flickrSrc(parsed, 'k') -> 2048px        (fullscreen)
// flickrPage(parsed)     -> https://www.flickr.com/photos//53778710552  (attribution)
```

Sizes used: `q` (150), `w` (400), `z` (640), `c` (800), `b` (1024), `k` (2048). A
`<FlickrImage url size />` component does the parsing + `srcset` so callers just pass the
pasted URL. No central photo table, no ids to manage — the URL lives in the column of the
row that uses it.

> Note: deriving sizes from the static URL needs the `secret`, which is present in the
> URL above — so always paste the **image** URL (the `src`), not the photo-page link.

---

## Google Drive downloads (archive)

Archive items show a Flickr **preview** (`image_url`) and offer a **download** of the
original from Google Drive (`download_url`). The curator pastes the normal Drive *share*
link; the app converts it to a direct download — same one-paste ergonomics as Flickr.

```
paste:    https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
becomes:  https://drive.google.com/uc?export=download&id=<FILE_ID>
```

A helper (`shared/lib/drive.ts`) handles it:

```ts
parseDriveUrl(shareUrl)   // -> { fileId }  (accepts /file/d/<id>/, ?id=<id>, open?id=<id>)
driveDownloadUrl(fileId)  // -> https://drive.google.com/uc?export=download&id=<id>
```

A `<DriveDownload url />` affordance renders a download button when `download_url` is set
and hides cleanly when blank. Notes for curators (document in the constants file):

- The Drive file must be shared **"Anyone with the link"** or the download fails.
- A plain `<a href download>` navigation triggers the browser download — no CORS handling
  needed (we never fetch the bytes in JS).
- Files over ~100MB (or anything Drive can't virus-scan, e.g. large audio) return Drive's
  "confirm download" interstitial instead of the file. For those, fall back to opening the
  Drive **view** page in a new tab.

---

## Relationships

All relationships are many-to-many, authored from one side as id lists, and made
bidirectional in code by building reverse indexes at load time.

```
            tags ─┐ (color/theme)
                  │  referenced by stories.tags, maps.tags, exhibits.tags, archive.tags,
                  │  collections.tags
                  ▼
  stories ──< map_ids >── maps ──< collection_ids >── collections
     │                      │
     │  (1:N) story_blocks   │  image_url = the map scan
     │
  exhibits ──< story_ids >── stories
  exhibits ──< map_ids   >── maps
  exhibits ──(1:N) exhibit_panels

  archive  (standalone assets; linked only by shared tags)
  timeline = derived union of all dated assets  (+ optional timeline_events)
```

| Relationship | Authored in | Cardinality | Reverse (derived in code) |
| --- | --- | --- | --- |
| Story ↔ Map | `stories.map_ids` | many ↔ many | "stories featuring this map" by scanning all `stories.map_ids` |
| Asset ↔ Tag | `*.tags` on each asset | many ↔ many | "all assets tagged X" by scanning every asset's `tags` |
| Map ↔ Collection | `maps.collection_ids` | many ↔ many | "maps in this collection" |
| Exhibit ↔ Story | `exhibits.story_ids` | many ↔ many | "exhibits featuring this story" |
| Exhibit ↔ Map | `exhibits.map_ids` | many ↔ many | "exhibits featuring this map" |
| Exhibit → Panels | `exhibit_panels.exhibit_id` | one → many | n/a |
| Story → Blocks | `story_blocks.story_id` | one → many | n/a |

**Why one-sided authoring?** You connect a story to its maps once, in the story row. You
never have to also edit each map to point back — the code derives the reverse. This keeps
CRUD to a single edit and avoids the two sheets drifting out of sync.

**Primary tag = color.** The first id in an asset's `tags` is its primary tag; that tag's
`color`/`theme` drives the asset's accent color across the UI (replacing the old hardcoded
`variant`/`colorScheme`).

---

## Derived views (no curator input)

- **Timeline** = every asset with a `year_start` (stories, maps, exhibits, archive) unioned
  with `timeline_events`, sorted by year. Each entry links back to its asset's detail page.
  The old `timeline.csv` with its `type`/`linkId` columns goes away.
- **Homepage interactive map** = every asset that has `lat`/`lng` **and** a per-item detail
  route, plotted as a marker colored by its primary tag's theme. Click a marker → the asset's
  detail page. Filterable by tag/theme. In practice this is stories + maps: only those two
  asset types have detail pages (`/stories/:id`, `/maps/:id`), so an exhibit/archive marker
  would navigate nowhere and is kept off the map even when it carries coordinates. The
  `useMapAssets` union still projects all four types, so adding exhibit/archive detail routes
  later is the only change needed to plot them.
- **Decade chips** (`#1930s`) = computed from `year_start`.
- **Related rails** ("Related Stories/Maps") = real now: shared-tag overlap + explicit
  `map_ids`/`story_ids` links, replacing the current `.slice(0, 2)` placeholder.
- **Archive grid filters** = `category` + `tags` + year.

---

## App wiring

Each sheet keeps the existing pattern: a `SHEET_URLS` entry, an RTK Query API using
`csvBaseQuery`, and a `transformResponse` that maps the raw `Row` to a typed domain model
(parsing csv columns into arrays, numbers, booleans).

New/changed pieces:

- `shared/config/sheets.ts` — add `tags`, `storyBlocks`, `collections`, `exhibitPanels`,
  `archive`; `maps` now points at the consolidated map sheet.
- `shared/lib/flickr.ts` — `parseFlickrUrl`, `flickrSrc`, `flickrPage`, `<FlickrImage>`.
- A small **relationship/index layer** (selectors) that, once all sheets are loaded, builds
  the reverse maps (tag → assets, map → stories, etc.) and the derived timeline + map-marker
  lists. Feature hooks (`useStory`, `useMapDetail`, …) read from this instead of slicing.
- Splitting helpers for the multi-value columns (`splitIds`, `splitTags`).

---

## Implementation notes (as built)

The design above is the contract; these are the intentional deviations the implementation
settled on across the build-out, so this doc stays a truthful source of truth:

- **`SHEET_URLS` keys.** Live keys: `stories`, `storyBlocks`, `maps`, `collections`,
  `exhibits`, `exhibitPanels`, `archive`, `tags`, `timelineEvents`. The old `atlas` key
  (folded into `maps`) and the old `timeline` key (the `type`/`linkId` sheet, replaced by the
  derived timeline) are **retired** — there is no `public/data/atlas.csv` or
  `public/data/timeline.csv`. The `timelineEvents` key reads `public/data/timeline_events.csv`
  (env override `VITE_SHEETS_TIMELINE_EVENTS_URL`).
- **Map domain type is `HartMap`**, not `Map` — `Map` is a built-in. `maps/types/map.ts`
  exports `toMap`, `mapToAsset`, `mapDecade`, and the `HartMap`/`MapRow` types.
- **Date formatting** lives in `shared/lib/dates.ts` (`formatDates(dates_label, year_start,
  year_end)`) — the shared `dates_label`-or-range formatter every asset card/detail uses.
- **`decadeOf`** (in `shared/relationships`) is the single decade helper; there is **no
  `decade` column** anywhere — decades are always derived from `year_start`. Likewise there
  are no `variant`/`colorScheme` columns: an asset's accent color is its primary tag's color.
- **Asset href shapes** (used by the `Asset` projections and the derived views): stories
  `/stories/:id`, maps `/maps/:id`, exhibits `/exhibits/:id`, archive `/archive/:id`. Only the
  first two are wired as routes today; see the homepage-map note under "Derived views".
- **Timeline events** carry `id, year, title, description?` (the shared `TimelineEvent` /
  `TimelineEntry` shapes in `shared/relationships`). The derived `TimelineEntry` exposes
  `id, year, title, href?, type?` — asset entries carry `href`/`type`, context events don't.
