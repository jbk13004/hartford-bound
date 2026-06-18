import { useMemo } from 'react'
import { useGetStoriesQuery, storyToAsset } from '@/features/stories'
import { useGetMapsQuery, mapToAsset } from '@/features/maps'
import { useGetExhibitsQuery, exhibitToAsset } from '@/features/exhibits'
import { useGetArchiveItemsQuery, archiveToAsset } from '@/features/archive'
import { useGetTagsQuery, indexTags } from '@/features/tags'
import {
  deriveMapMarkers,
  type Asset,
  type AssetType,
  type MapMarker,
} from '@/shared/relationships'

/**
 * Asset types that have a per-item detail route (`/stories/:id`, `/maps/:id`).
 * Exhibits and archive items have no detail page, so a marker for one would
 * navigate nowhere — we keep them off the homepage map even if they carry
 * coordinates. (See `docs/data-model.md` → "Homepage interactive map".)
 */
const NAVIGABLE_TYPES: ReadonlySet<AssetType> = new Set<AssetType>(['story', 'map'])

/**
 * Controller for the homepage map's plotted assets. Unions every asset
 * projection, keeps those with coordinates AND a navigable detail route, and
 * derives the markers (each carrying its type, sneak-peek fields, and primary
 * tag's theme) once the tag vocabulary has loaded.
 *
 * Returns all markers plus the distinct themes present, so the view can offer
 * theme filtering. Mapbox plotting + the filter UI live in the component.
 */
export function useMapAssets() {
  const stories = useGetStoriesQuery()
  const maps = useGetMapsQuery()
  const exhibits = useGetExhibitsQuery()
  const archive = useGetArchiveItemsQuery()
  const tags = useGetTagsQuery()

  const isLoading =
    stories.isLoading ||
    maps.isLoading ||
    exhibits.isLoading ||
    archive.isLoading ||
    tags.isLoading

  const markers = useMemo<MapMarker[]>(() => {
    const assets: Asset[] = [
      ...(stories.data ?? []).map(storyToAsset),
      ...(maps.data ?? []).map(mapToAsset),
      ...(exhibits.data ?? []).map(exhibitToAsset),
      ...(archive.data ?? []).map(archiveToAsset),
    ].filter((asset) => NAVIGABLE_TYPES.has(asset.type))
    return deriveMapMarkers(assets, indexTags(tags.data ?? []))
  }, [stories.data, maps.data, exhibits.data, archive.data, tags.data])

  // Distinct, non-empty themes present in the plotted markers (for theme filters).
  const themes = useMemo(
    () => [...new Set(markers.map((m) => m.theme).filter((t): t is Exclude<typeof t, ''> => t !== ''))].sort(),
    [markers],
  )

  return { markers, themes, isLoading }
}
