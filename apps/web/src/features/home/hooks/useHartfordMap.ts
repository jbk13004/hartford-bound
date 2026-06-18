import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import mapboxgl from 'mapbox-gl'
import type { MapMarker } from '@/shared/relationships'

// Public token, inlined into the bundle at build time. Protect it with a
// URL-restricted Mapbox token rather than treating it as a secret.
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/**
 * Controller for the homepage Mapbox map. Creates the map once (non-interactive,
 * behind the splash) and exposes `enableInteraction` to turn on the controls
 * when the visitor starts exploring.
 *
 * Plots the given markers (colored by their primary tag, navigating to the
 * asset's detail route on click) and re-plots whenever the marker list changes,
 * clearing stale markers first so a filter change never leaves duplicates.
 */
export function useHartfordMap(markers: MapMarker[]) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
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
      const instance = new mapboxgl.Marker({ color: marker.color })
        .setLngLat([marker.lng, marker.lat])
        .addTo(map)
      instance.getElement().style.cursor = 'pointer'
      instance.getElement().addEventListener('click', () => navigate(marker.href))
      return instance
    })

    return () => {
      for (const marker of markersRef.current) marker.remove()
      markersRef.current = []
    }
  }, [markers, navigate])

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
