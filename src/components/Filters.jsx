import { ArrowUpDown } from 'lucide-react'

const METRICS = [
  { value: 'views', label: 'Views' },
  { value: 'likes', label: 'Likes' },
  { value: 'comments', label: 'Comments' },
  { value: 'shares', label: 'Shares' },
  { value: 'saves', label: 'Saves' },
  { value: 'engagementRate', label: 'Engagement Rate' },
  { value: 'date', label: 'Newest' },
]

export default function Filters({ filters, setFilters, disabled }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 ${disabled ? 'opacity-60' : ''}`}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-white/60">Sort by</label>
          <div className="flex gap-2">
            <select
              disabled={disabled}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
              value={filters.metric}
              onChange={(e) => update('metric', e.target.value)}
            >
              {METRICS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <button
              type="button"
              disabled={disabled}
              onClick={() => update('order', filters.order === 'asc' ? 'desc' : 'asc')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm hover:border-fuchsia-500"
            >
              <ArrowUpDown className="h-4 w-4" />
              {filters.order === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/60">Top N</label>
          <input
            type="number"
            min={1}
            max={500}
            disabled={disabled}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
            value={filters.limit}
            onChange={(e) => update('limit', Number(e.target.value))}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs text-white/60">Search in captions</label>
          <input
            disabled={disabled}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
            placeholder="keyword..."
            value={filters.query}
            onChange={(e) => update('query', e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/60">Content Types</label>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/40 p-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                disabled={disabled}
                checked={filters.contentTypes.reels}
                onChange={(e) => update('contentTypes', { ...filters.contentTypes, reels: e.target.checked })}
              />
              Reels
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                disabled={disabled}
                checked={filters.contentTypes.tiktok}
                onChange={(e) => update('contentTypes', { ...filters.contentTypes, tiktok: e.target.checked })}
              />
              TikTok
            </label>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/60">Date range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              disabled={disabled}
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
              value={filters.dateRange.from}
              onChange={(e) => update('dateRange', { ...filters.dateRange, from: e.target.value })}
            />
            <input
              type="date"
              disabled={disabled}
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
              value={filters.dateRange.to}
              onChange={(e) => update('dateRange', { ...filters.dateRange, to: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
