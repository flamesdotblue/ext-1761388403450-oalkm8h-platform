import { Loader2, User } from 'lucide-react'

export default function StatsBar({ profile, stats, loading, error }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      {loading ? (
        <div className="flex items-center gap-2 text-white/70">
          <Loader2 className="h-4 w-4 animate-spin" />
          Fetching public posts and calculating stats...
        </div>
      ) : error ? (
        <div className="text-rose-300">{error}</div>
      ) : profile ? (
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-black/40">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.handle} className="h-full w-full object-cover" />
              ) : (
                <User className="h-5 w-5 text-white/70" />
              )}
            </div>
            <div>
              <div className="text-sm font-semibold">{profile.name || profile.handle}</div>
              <div className="text-xs text-white/60">@{profile.handle} • {profile.platform.toUpperCase()}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <div>
              <div className="text-xs text-white/60">Posts</div>
              <div className="text-sm font-semibold">{stats.count}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Total Views</div>
              <div className="text-sm font-semibold">{Intl.NumberFormat().format(stats.total.views)}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Avg ER</div>
              <div className="text-sm font-semibold">{(stats.avg.engagementRate * 100).toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Avg Views</div>
              <div className="text-sm font-semibold">{Intl.NumberFormat().format(Math.round(stats.avg.views))}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white/70">Search a profile to see analytics.</div>
      )}
    </div>
  )
}
