import { http, HttpResponse } from 'msw'

const FLICKR = 'https://live.staticflickr.com/65535/53778710552_01f2058482_b.jpg'

/** Controlled fixtures (not the real seed data) so tests assert against stable input. */
export const STORIES_CSV = `id,title,subtitle,excerpt,year_start,year_end,dates_label,lat,lng,tags,map_ids,hero_image_url
addie-brown,Addie Brown,A short subtitle,An excerpt about Addie.,1841,1870,,41.76,-72.68,"labor, migration",holc-redlining,${FLICKR}
james-mars,James Mars,Another subtitle,An excerpt about James.,1790,1880,,41.77,-72.67,race,,${FLICKR}
`

export const STORY_BLOCKS_CSV = `story_id,sort_order,type,text,image_url,caption
addie-brown,20,text,Second paragraph,,
addie-brown,10,heading,Early Life,,
addie-brown,30,photo,,${FLICKR},A caption
james-mars,10,text,Only paragraph,,
`

export const MAPS_CSV = `id,title,subtitle,description,year_start,year_end,dates_label,lat,lng,tags,collection_ids,image_url
holc-redlining,HOLC Redlining,1937 grades,Redlining context.,1937,,,41.76,-72.68,"race, migration",routes-and-roots,${FLICKR}
ward-map-1910,1910 Ward Map,Wards,Ward boundaries.,1910,,,41.77,-72.69,race,routes-and-roots,${FLICKR}
trolley-1950,Trolley Lines,Transit,Streetcar routes.,1950,,,41.75,-72.66,migration,hartford-through-time,${FLICKR}
`

export const COLLECTIONS_CSV = `id,title,subtitle,description,cover_image_url,tags
routes-and-roots,Routes and Roots,Migration Patterns,Pathways of the Great Migration.,${FLICKR},migration
hartford-through-time,Hartford Through Time,Historical Chronology,Urban development over time.,${FLICKR},migration
`

export const TAGS_CSV = `id,label,theme,color,description
migration,Migration,migration,#72B591,Movement of people.
labor,Labor,,#D1D35E,"Work, unions, and economies."
race,Race,race,#C26B5A,The color line.
`

// Exhibits: `the-great-migration` is active and links real fixture stories/maps;
// `housing-justice` is inactive and place-anchored (lat/lng) for the map test.
export const EXHIBITS_CSV = `id,title,subtitle,year_start,year_end,dates_label,active,lat,lng,tags,story_ids,map_ids,cover_image_url
the-great-migration,The Great Migration,Northward into Hartford.,1915,1940,,TRUE,41.78,-72.68,"migration, race","addie-brown, james-mars","holc-redlining, ward-map-1910",${FLICKR}
housing-justice,Housing Justice,The fight over home.,1945,1968,,FALSE,41.77,-72.69,"race",james-mars,holc-redlining,${FLICKR}
`

// Panels deliberately out of sort_order so tests assert the hook orders them;
// the great-migration exhibit has 2 panels (derived count = 2).
export const EXHIBIT_PANELS_CSV = `exhibit_id,sort_order,label,title,body,image_url,caption
the-great-migration,20,Part 2,Building Community,Churches and mutual aid.,${FLICKR},A congregation
the-great-migration,10,Part 1,North End Arrivals,The first waves arrive.,${FLICKR},Albany Avenue
housing-justice,10,Part 1,The Red Lines,Graded for exclusion.,${FLICKR},
`

// Archive: two rows carry a Drive share link (download offered), the rest blank.
export const ARCHIVE_CSV = `id,title,category,year_start,year_end,dates_label,tags,image_url,download_url,description
albany-storefronts,Albany Avenue Storefronts,photographs,1920,,,"migration, community",${FLICKR},,Storefronts on Albany Ave.
fair-housing-petition,Fair Housing Petition,documents,1945,,,"housing, activism",${FLICKR},https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz012345/view?usp=sharing,A residents' petition.
sanborn-1880,1880 Sanborn Sheet,maps,1880,,,"community",${FLICKR},,A fire-insurance map sheet.
busing-1960,School Busing,photographs,1960,,,"race",${FLICKR},https://drive.google.com/file/d/1ZyXwVuTsRqPoNmLkJiHgFeDcBa987654/view?usp=sharing,Students boarding buses.
`

// Timeline events: non-asset context beats. `hartford-founded` (1635) predates
// every fixture asset, so the derived-timeline test can assert it sorts first.
export const TIMELINE_EVENTS_CSV = `id,year,title,description
hartford-founded,1635,Hartford Founded,Thomas Hooker leads a congregation to the Connecticut River.
fair-housing-act,1968,Federal Fair Housing Act,Federal law bars housing discrimination.
`

export const handlers = [
  http.get('*/data/stories.csv', () => HttpResponse.text(STORIES_CSV)),
  http.get('*/data/story_blocks.csv', () => HttpResponse.text(STORY_BLOCKS_CSV)),
  http.get('*/data/maps.csv', () => HttpResponse.text(MAPS_CSV)),
  http.get('*/data/collections.csv', () => HttpResponse.text(COLLECTIONS_CSV)),
  http.get('*/data/tags.csv', () => HttpResponse.text(TAGS_CSV)),
  http.get('*/data/exhibits.csv', () => HttpResponse.text(EXHIBITS_CSV)),
  http.get('*/data/exhibit_panels.csv', () => HttpResponse.text(EXHIBIT_PANELS_CSV)),
  http.get('*/data/archive.csv', () => HttpResponse.text(ARCHIVE_CSV)),
  http.get('*/data/timeline_events.csv', () => HttpResponse.text(TIMELINE_EVENTS_CSV)),
]
