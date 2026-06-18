# Hartford Bound — full data-model build-out — workflow plan

**Workflow run slug:** hartford-data-model
**Started (fresh):** 2026-06-18
**Mode:** isolated-builder-team with overrides — converge on a long-lived integration branch,
no per-stage human test, orchestrator self-merges each stage PR into the integration branch,
minimize concurrent agents/tokens. Never merge to `main`.

## Branches
- **Integration branch:** `jamesk/hartford-data-model-integration` — already exists, pristine
  (= `main` tip + `Step 0` data-model.md seed at `eb06a06`). This is the convergence target.
  Every stage PR is opened with base = this branch and self-merged into it.
- **Stage branches:** `jamesk/hartford-data-model-stage-<n>-<short>`.
- **Implementor branches:** `jamesk/hartford-data-model-stage-<n>-web` (child of the stage branch).
- Base SHA for stage N>1 = the integration tip after stage N-1 is merged (stages are sequential).

## Nature of the change
Web-only (`apps/web`). No infra / server / mobile / proto, no DB, no migrations, no new required
env vars (the optional `VITE_SHEETS_*` overrides stay). All cross-cutting consequences are inside
the web app:
- New RTK Query APIs registered in `app/store.ts` (tags, story_blocks, collections, exhibit_panels).
- `shared/config/sheets.ts` consolidated into the single self-documenting live-data constants file.
- New shared libs: `shared/lib/flickr.ts` (+ `<FlickrImage>`), `shared/lib/drive.ts`
  (+ `<DriveDownload>`), `shared/lib/ids.ts` (`splitIds` / `splitTags`).
- New `shared/relationships/` reverse-index + derived-view selector layer.
- Rewritten / new seed CSVs in `public/data/`.

## Execution model (override-adapted)
- **Sequential stages**, one at a time. Per stage: spawn **1 builder** → builder authors the spec +
  interfaces + tests, requests **1 web implementor** → implementor writes code, self-verifies green →
  builder **reviews** the diff (the retained code-review loop) → builder merges implementor branch into
  its stage branch and reports ready-for-integration → orchestrator opens the stage PR (base =
  integration branch) and **self-merges it into the integration branch**.
- **≤2 agents alive at once** (builder + its implementor). Let them go before the next stage.
  No cascade parallelism (rate-limit-minimizing).
- **No per-stage human test** (override). The only human gate is at the very end.
- Each stage is self-contained: it rewrites the feature(s) it touches *together with* their consumers,
  so the integration branch builds / typechecks (strict) / lints / tests green after every merge.

## Stage map
| ID | Handle | Exposes | Consumes | PR base | PR head | Open-after |
|----|--------|---------|----------|---------|---------|------------|
| 1 | **foundation** | `shared/lib/{flickr,drive,ids}.ts` + `<FlickrImage>`/`<DriveDownload>`; consolidated self-documenting `sheets.ts`; `tags` feature (`Tag`, `useGetTagsQuery`, primary-tag color/theme lookup); `shared/relationships` (generic `Asset`, `buildReverseIndex`, related-by-tags + explicit-link helpers, derived-timeline + map-marker selectors) — all fixture-tested | Step 0 doc | integration | jamesk/…-stage-1-foundation | now |
| 2 | **stories-and-maps** | rewritten `stories` (+`story_blocks` body, hero, real related, "maps in this story") and `maps` (+`collections` landing cards, absorbs `atlas`, scan via `<FlickrImage>`, collection filtering, real related) features + seed CSVs | stage 1 | integration | jamesk/…-stage-2-stories-and-maps | PR 1 merged |
| 3 | **exhibits-and-archive** | rewritten `exhibits` (+`exhibit_panels` slideshow with derived `/N`, linked stories/maps) and `archive` (Flickr preview + Drive download, category/tag/year filters) features + seed CSVs | stage 1 (+ story/map ids from stage 2 by string) | integration | jamesk/…-stage-3-exhibits-and-archive | PR 2 merged |
| 4 | **derived-views-and-cleanup** | homepage Mapbox markers (all lat/lng assets, primary-tag-theme colored, click→detail, tag/theme filter); derived timeline (union of dated assets + optional `timeline_events`); About placeholder removal; retire `variant`/`colorScheme`/`decade`; delete orphaned `atlas.csv`/`timeline.csv`; reconcile `data-model.md` | stages 1–3 | integration | jamesk/…-stage-4-derived-views-and-cleanup | PR 3 merged |

### Why this decomposition
- **Foundation first** — every page depends on the flickr/drive/id helpers, the consolidated sheets
  config, the tag vocabulary (color source), and the reverse-index/derived-view layer. Purely additive.
- **Stories + Maps together** — the story↔map ("maps in this story") relationship and the shared-tag
  related rails need both feature data layers in one buildable unit.
- **Exhibits + Archive together** — second content pair; exhibits cross-link to stories/maps by id
  (strings authored in CSV, resolved in code), which exist after stage 2.
- **Derived views last** — the homepage map and the derived timeline must union *all* feature data, so
  they need stages 1–3 present. Final cleanup + doc reconciliation lands here.

## Anticipated data-model.md deviations (builders confirm + update the doc)
- Keep optional `subtitle`/`excerpt`/`alt` columns where components need them.
- `sheets.ts`: `maps` key repoints to the consolidated scan sheet in stage 2; the `atlas` key is retired
  there. New keys: `tags`, `storyBlocks`, `collections`, `exhibitPanels` (archive already exists).
- Exact column names may shift slightly to match transforms — any change is mirrored into data-model.md.

## Seed image convention
Universal Flickr stand-in wherever a real photo isn't known:
`https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg`
(server 65535 / photoId 53778710552 / secret 01f2058482 / size b). Proves the Flickr pipeline end-to-end.
Seed a couple of `archive` rows with example Google Drive share links to exercise the download path.

## Placeholder imagery to remove (homepage art excepted)
- `lh3.googleusercontent.com/aida-public/…` headshots: About (×2), Exhibits, and in
  `stories.csv` / `maps.csv` image columns.
- `picsum.photos/…` in `atlas.csv`.
- `via.placeholder.com` in `archive.csv` (confirm during stage 3).

## Subagent registry
| Name | Role | Stage | Sub-branch | Base SHA | Status |
|------|------|-------|------------|----------|--------|
| hdm-stage-1-foundation | builder | 1 | jamesk/hartford-data-model-stage-1-foundation | eb06a06 | spawning |

## Interface handoffs
| Stage | Interface commit SHA | Reported at | Consumed by |
|-------|---------------------|-------------|-------------|
| (populated as builders report) | | | |

## CLAUDE.md additions
| Stage | File | Section | Notes |
|-------|------|---------|-------|
| (populated as builders report) | | | |

## Progress
- [x] Planning Phase (fresh)
- [ ] Stage Execution — stage 1 foundation
- [ ] Stage Execution — stage 2 stories-and-maps
- [ ] Stage Execution — stage 3 exhibits-and-archive
- [ ] Stage Execution — stage 4 derived-views-and-cleanup
- [ ] Wrap-up — hand integration branch to human for one end-to-end test + review
