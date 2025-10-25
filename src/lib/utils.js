import { mockItems, mockProfile } from './sampleData'

export function parseHandleFromInput(input, platform) {
  let s = input.trim()
  if (s.startsWith('@')) s = s.slice(1)
  try {
    const url = new URL(s)
    // Instagram: https://www.instagram.com/handle
    // TikTok: https://www.tiktok.com/@handle or /handle
    if (url.hostname.includes('instagram.')) {
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts[0]) return parts[0]
    }
    if (url.hostname.includes('tiktok.')) {
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts[0]?.startsWith('@')) return parts[0].slice(1)
      if (parts[0]) return parts[0]
    }
  } catch (_) {
    // not a URL, treat as handle
  }
  return s
}

export function computeEngagementRate(item) {
  const denom = Math.max(item.views || 0, 1)
  const totalInteract = (item.likes || 0) + (item.comments || 0) + (item.shares || 0) + (item.saves || 0)
  return totalInteract / denom
}

export function applySortAndFilters(items, filters) {
  const { metric, order, limit, query, contentTypes, dateRange } = filters
  let arr = items.map((i) => ({ ...i, engagementRate: computeEngagementRate(i) }))

  // content type filter
  arr = arr.filter((i) => {
    const isIG = i.platform === 'instagram'
    const isTT = i.platform === 'tiktok'
    const typeOk = (isIG && contentTypes.reels) || (isTT && contentTypes.tiktok)
    return typeOk
  })

  // search
  if (query?.trim()) {
    const q = query.trim().toLowerCase()
    arr = arr.filter((i) => (i.caption || '').toLowerCase().includes(q))
  }

  // date range
  if (dateRange?.from) {
    const from = new Date(dateRange.from)
    arr = arr.filter((i) => new Date(i.date) >= from)
  }
  if (dateRange?.to) {
    const to = new Date(dateRange.to)
    arr = arr.filter((i) => new Date(i.date) <= to)
  }

  // sort
  const dir = order === 'asc' ? 1 : -1
  arr.sort((a, b) => {
    let va, vb
    if (metric === 'date') {
      va = new Date(a.date).getTime()
      vb = new Date(b.date).getTime()
    } else {
      va = a[metric] ?? 0
      vb = b[metric] ?? 0
    }
    if (va === vb) return 0
    return va > vb ? dir : -dir
  })

  // limit
  const sliced = arr.slice(0, Math.max(1, Math.min(limit || 50, 500)))

  // stats
  const count = sliced.length
  const totals = sliced.reduce(
    (acc, i) => {
      acc.views += i.views || 0
      acc.likes += i.likes || 0
      acc.comments += i.comments || 0
      acc.shares += i.shares || 0
      acc.saves += i.saves || 0
      acc.engagementRate += i.engagementRate || 0
      return acc
    },
    { views: 0, likes: 0, comments: 0, shares: 0, saves: 0, engagementRate: 0 }
  )
  const avg = {
    views: count ? totals.views / count : 0,
    likes: count ? totals.likes / count : 0,
    comments: count ? totals.comments / count : 0,
    shares: count ? totals.shares / count : 0,
    saves: count ? totals.saves / count : 0,
    engagementRate: count ? totals.engagementRate / count : 0,
  }

  return { results: sliced, stats: { count, total: totals, avg } }
}

// Mock fetch to simulate result set
export async function fetchProfileMock({ handle, platform }) {
  await new Promise((r) => setTimeout(r, 800))
  if (!handle) return { error: 'Invalid handle' }
  // Simulate different mixes per platform by mapping and cloning
  const items = mockItems
    .filter((i) => i.platform === platform)
    .concat(
      mockItems
        .filter((i) => i.platform !== platform)
        .slice(0, 2)
        .map((i, idx) => ({ ...i, id: `${platform}_${idx}_${i.id}` }))
    )
    .map((i) => ({ ...i, url: i.url + `?from=${platform}` }))

  const profile = mockProfile({ handle, platform })
  return { profile, items }
}
