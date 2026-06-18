import { useEffect, useRef } from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import type { MapMarker } from '@/shared/relationships'
import { flickrSrc, parseFlickrUrl } from '@/shared/lib/flickr'

// Public token, inlined into the bundle at build time. Protect it with a
// URL-restricted Mapbox token rather than treating it as a secret.
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/** Story waypoints show an open-book glyph; map waypoints show a map glyph. */
const markerIcon = (type: MapMarker['type']): string =>
  type === 'map' ? 'map' : 'auto_stories'

/**
 * Build the marker's DOM element: a uniform circular badge (no per-theme color)
 * carrying the type's Material Symbols glyph. Tailwind v4 scans `.ts` sources,
 * so these literal classes compile.
 */
function buildMarkerElement(marker: MapMarker): HTMLDivElement {
  const el = document.createElement('div')
  el.className =
    'flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-md ring-2 ring-black cursor-pointer transition-transform hover:scale-110'
  el.innerHTML =
    '<span class="material-symbols-outlined text-[20px]">' +
    markerIcon(marker.type) +
    '</span>'
  return el
}

/**
 * Build the popup card DOM: an optional image header (when `imageUrl` parses as
 * a Flickr static URL), the title + clamped excerpt, and an "Open Story" /
 * "Open Map" button that navigates via React Router (so we keep the SPA).
 */
function buildPopupCard(
  marker: MapMarker,
  popup: mapboxgl.Popup,
  navigate: NavigateFunction,
): HTMLDivElement {
  const card = document.createElement('div')
  card.className = 'w-[280px] overflow-hidden rounded-2xl bg-white text-black shadow-xl'

  const parsed = parseFlickrUrl(marker.imageUrl ?? '')
  if (parsed) {
    const img = document.createElement('img')
    img.src = flickrSrc(parsed, 'z')
    img.alt = marker.title
    img.className = 'h-32 w-full object-cover'
    card.appendChild(img)
  }

  const body = document.createElement('div')
  body.className = 'flex flex-col gap-2 p-4'

  const title = document.createElement('h3')
  title.className = 'font-display text-base font-bold leading-snug'
  title.textContent = marker.title
  body.appendChild(title)

  if (marker.excerpt) {
    const excerpt = document.createElement('p')
    excerpt.className = 'line-clamp-2 text-sm text-slate-600'
    excerpt.textContent = marker.excerpt
    body.appendChild(excerpt)
  }

  const isMap = marker.type === 'map'
  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'mt-1 inline-flex items-center justify-center gap-1 self-start rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 ' +
    (isMap ? 'bg-mint' : 'bg-sky')
  button.innerHTML =
    (isMap ? 'Open Map' : 'Open Story') +
    '<span class="material-symbols-outlined text-[18px]">arrow_forward</span>'
  button.addEventListener('click', () => {
    popup.remove()
    navigate(marker.href)
  })
  body.appendChild(button)

  card.appendChild(body)
  return card
}

/**
 * Controller for the homepage Mapbox map. Creates the map once (non-interactive,
 * behind the splash) and exposes `enableInteraction` to turn on the controls
 * when the visitor starts exploring.
 *
 * Plots the given markers as uniform icon circles (story vs map glyph). Clicking
 * a marker opens a single styled in-map popup with a sneak peek and an
 * "Open Story"/"Open Map" button; only one popup is shown at a time. Re-plots
 * whenever the marker list changes, clearing stale markers first so a filter
 * change never leaves duplicates.
 */
export function useHartfordMap(markers: MapMarker[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const popupRef = useRef<mapboxgl.Popup | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [-72.6823, 41.7658],
      zoom: 12,
      interactive: false,
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    for (const marker of markersRef.current) marker.remove()
    markersRef.current = markers.map((marker) => {
      const el = buildMarkerElement(marker)
      const instance = new mapboxgl.Marker({ element: el })
        .setLngLat([marker.lng, marker.lat])
        .addTo(map)
      el.addEventListener('click', () => {
        popupRef.current?.remove()
        const popup = new mapboxgl.Popup({
          offset: 24,
          closeButton: true,
          maxWidth: '300px',
        }).setLngLat([marker.lng, marker.lat])
        popup.setDOMContent(buildPopupCard(marker, popup, navigate))
        popup.addTo(map)
        popupRef.current = popup
      })
      return instance
    })

    return () => {
      for (const marker of markersRef.current) marker.remove()
      markersRef.current = []
      popupRef.current?.remove()
      popupRef.current = null
    }
  }, [markers, navigate])

  useEffect(() => {
    return () => {
      popupRef.current?.remove()
      popupRef.current = null
    }
  }, [])

  const enableInteraction = () => {
    const map = mapRef.current
    if (!map) return
    map.scrollZoom.enable()
    map.boxZoom.enable()
    map.dragRotate.enable()
    map.dragPan.enable()
    map.keyboard.enable()
    map.doubleClickZoom.enable()
    map.touchZoomRotate.enable()
  }

  return { containerRef, enableInteraction }
}
