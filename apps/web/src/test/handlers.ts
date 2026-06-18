import { http, HttpResponse } from 'msw'

/** Controlled fixture (not the real seed data) so tests assert against stable input. */
export const STORIES_CSV = `id,title,dates,excerpt,tags,image,alt,variant,subtitle,body
addie-brown,Addie Brown,1841 — 1870,An excerpt about Addie.,"#LABOR, #GENDER",http://example.test/addie.jpg,Portrait of Addie Brown,blue,A short subtitle,First paragraph | Second paragraph
james-mars,James Mars,1790 — 1880,An excerpt about James.,#ACTIVISM,http://example.test/james.jpg,Portrait of James Mars,yellow,Another subtitle,Only paragraph
`

export const TAGS_CSV = `id,label,theme,color,description
migration,Migration,migration,#72B591,Movement of people.
labor,Labor,,#D1D35E,"Work, unions, and economies."
race,Race,race,#C26B5A,The color line.
`

export const handlers = [
  http.get('*/data/stories.csv', () => HttpResponse.text(STORIES_CSV)),
  http.get('*/data/tags.csv', () => HttpResponse.text(TAGS_CSV)),
]
