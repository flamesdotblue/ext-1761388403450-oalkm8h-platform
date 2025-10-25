import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { parseHandleFromInput, fetchProfileMock } from '../lib/utils'

export default function ProfileInput({ onFetchStart, onFetchComplete }) {
  const [input, setInput] = useState('')
  const [platform, setPlatform] = useState('instagram')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const handle = parseHandleFromInput(input, platform)
    onFetchStart?.()
    try {
      const data = await fetchProfileMock({ handle, platform })
      onFetchComplete?.(data)
    } catch (err) {
      onFetchComplete?.({ error: err?.message || 'Failed to fetch profile' })
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm font-medium text-white/80">Profile username or URL</label>
        <input
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-fuchsia-500"
          placeholder="e.g. @alex or https://www.instagram.com/alex"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <div className="flex items-center gap-2">
          <select
            className="w-40 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm focus:border-fuchsia-500"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-medium text-white hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
          >
            <Search className="h-4 w-4" />
            Analyze Profile
          </button>
        </div>
        <p className="text-xs text-white/50">
          Tip: Paste any public profile URL or handle. We’ll simulate results here. For production, connect a server-side scraper or official APIs.
        </p>
      </form>
    </div>
  )
}
