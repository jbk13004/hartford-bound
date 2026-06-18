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

export const handlers = [
  http.get('*/data/stories.csv', () => HttpResponse.text(STORIES_CSV)),
  http.get('*/data/story_blocks.csv', () => HttpResponse.text(STORY_BLOCKS_CSV)),
  http.get('*/data/maps.csv', () => HttpResponse.text(MAPS_CSV)),
  http.get('*/data/collections.csv', () => HttpResponse.text(COLLECTIONS_CSV)),
  http.get('*/data/tags.csv', () => HttpResponse.text(TAGS_CSV)),
]
