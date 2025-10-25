import { ExternalLink, Heart, MessageCircle, Share2, Bookmark, Play } from 'lucide-react'

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-white/70">
      <Icon className="h-3.5 w-3.5 text-white/70" />
      <span className="font-medium text-white/90">{Intl.NumberFormat().format(value)}</span>
      <span className="text-white/50">{label}</span>
    </div>
  )
}

function Card({ item }) {
  const date = new Date(item.date)
  const url = item.url
  const platformBadge = item.platform === 'instagram' ? 'IG Reels' : 'TikTok'
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="aspect-video w-full overflow-hidden bg-black/30">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={item.caption || 'thumbnail'} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/50">
            <Play className="h-8 w-8" />
          </div>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] text-white/70">{platformBadge}</span>
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-fuchsia-400 hover:underline">
            Open <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="line-clamp-2 text-sm text-white/90">{item.caption || '—'}</p>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-3">
            <Stat icon={Play} value={item.views} label="views" />
            <Stat icon={Heart} value={item.likes} label="likes" />
            <Stat icon={MessageCircle} value={item.comments} label="comments" />
            <Stat icon={Share2} value={item.shares} label="shares" />
            <Stat icon={Bookmark} value={item.saves} label="saves" />
          </div>
          <div className="text-right text-[11px] text-white/60">
            <div>{date.toLocaleDateString()}</div>
            <div>ER: {(item.engagementRate * 100).toFixed(2)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-60 animate-pulse rounded-xl border border-white/10 bg-white/5" />
        ))}
      </div>
    )
  }

  if (!items?.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
        No results yet. Search a profile to see their top content.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  )
}
