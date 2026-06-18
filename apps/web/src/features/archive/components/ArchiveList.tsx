import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { FlickrImage } from '@/shared/components/FlickrImage'
import { DriveDownload } from '@/shared/components/DriveDownload'
import { useArchive } from '../hooks/useArchive'
import type { ArchiveItem } from '../types/archiveItem'

const columnHelper = createColumnHelper<ArchiveItem>()

// Headless column model: a thumbnail + the text columns, then the download.
// `display` columns (thumb/download) carry no value and aren't sortable.
const columns = [
  columnHelper.display({
    id: 'thumb',
    header: '',
    cell: ({ row }) => (
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
        <FlickrImage
          url={row.original.image_url}
          size="w"
          alt={row.original.title}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => (
      <span className="font-medium text-sm text-gray-900 line-clamp-2">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => <span className="text-sm text-gray-600 capitalize">{info.getValue()}</span>,
  }),
  columnHelper.accessor((item) => item.year_start ?? 0, {
    id: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const item = row.original
      const label = item.dates_label || (item.year_start !== undefined ? String(item.year_start) : '')
      return <span className="text-sm text-gray-600 whitespace-nowrap">{label}</span>
    },
  }),
  columnHelper.display({
    id: 'tags',
    header: 'Tags',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.map((tag) => (
          <span
            key={tag}
            className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-white/50 text-slate-600 rounded border border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'download',
    header: '',
    // Renders nothing when download_url is blank (DriveDownload returns null).
    cell: ({ row }) => <DriveDownload url={row.original.download_url} />,
  }),
]

// Per-column responsive/layout classes, applied to both header and body cells.
const COLUMN_CLASS: Record<string, string> = {
  thumb: 'w-20',
  title: 'w-full',
  category: 'hidden sm:table-cell',
  tags: 'hidden md:table-cell',
  download: 'text-right whitespace-nowrap',
}

export function ArchiveList() {
  // Ephemeral UI state: the three active filters + the table's sort.
  const [category, setCategory] = useState('all')
  const [tag, setTag] = useState('all')
  const [year, setYear] = useState('all')
  const [sorting, setSorting] = useState<SortingState>([])
  const { items, categories, tags, years, isLoading, isError } = useArchive({
    category,
    tag,
    year,
  })

  // React Compiler can't memoize TanStack Table's returned functions, so it
  // skips optimizing this component — expected and safe (correctness is fine).
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: items,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="py-12">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-4">Archive</h1>
          <p className="text-gray-600 max-w-2xl">
            Browse our collection of historical photographs, documents, maps, and oral
            histories that document Hartford&apos;s rich history.
          </p>
        </div>

        {/* Filters: category + tag + year */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  category === c
                    ? 'bg-sky text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex gap-3 md:ml-auto">
            <label className="sr-only" htmlFor="archive-tag">
              Filter by tag
            </label>
            <select
              id="archive-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All tags' : t}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="archive-year">
              Filter by year
            </label>
            <select
              id="archive-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'all' ? 'All years' : y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-100 rounded-lg" />
                <div className="h-3 bg-gray-100 rounded mt-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">error</span>
            <p className="text-gray-600">Couldn&apos;t load the archive. Please try again later.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">
              inventory_2
            </span>
            <p className="text-gray-600">No items found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-gray-200 text-left">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        aria-sort={
                          header.column.getIsSorted() === 'asc'
                            ? 'ascending'
                            : header.column.getIsSorted() === 'desc'
                              ? 'descending'
                              : undefined
                        }
                        className={`py-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
                          COLUMN_CLASS[header.column.id] ?? ''
                        }`}
                      >
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1 hover:text-gray-700"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span aria-hidden="true" className="text-[10px] text-gray-400">
                              {header.column.getIsSorted() === 'asc'
                                ? '▲'
                                : header.column.getIsSorted() === 'desc'
                                  ? '▼'
                                  : ''}
                            </span>
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`py-3 px-3 align-middle ${COLUMN_CLASS[cell.column.id] ?? ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
