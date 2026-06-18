import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

// Public token, inlined into the bundle at build time. Protect it with a
// URL-restricted Mapbox token rather than treating it as a secret.
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

/**
 * Controller for the homepage Mapbox map. Creates the map once (non-interactive,
 * behind the splash) and exposes `enableInteraction` to turn on the controls
 * when the visitor starts exploring.
 */
export function useHartfordMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

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
