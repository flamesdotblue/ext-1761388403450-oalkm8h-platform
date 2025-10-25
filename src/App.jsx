import { useMemo, useState } from 'react'
import Hero from './components/Hero'
import ProfileInput from './components/ProfileInput'
import Filters from './components/Filters'
import StatsBar from './components/StatsBar'
import ResultsGrid from './components/ResultsGrid'
import { applySortAndFilters } from './lib/utils'

export default function App() {
  const [items, setItems] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({
    metric: 'views',
    order: 'desc',
    limit: 50,
    query: '',
    contentTypes: { reels: true, tiktok: true },
    dateRange: { from: '', to: '' },
  })

  const { results, stats } = useMemo(() => applySortAndFilters(items, filters), [items, filters])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <Hero />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <div className="grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-4">
            <ProfileInput
              onFetchStart={() => { setError(''); setLoading(true) }}
              onFetchComplete={(payload) => {
                setLoading(false)
                if (payload.error) {
                  setError(payload.error)
                  setItems([])
                  setProfile(null)
                } else {
                  setProfile(payload.profile)
                  setItems(payload.items)
                }
              }}
            />
            <div className="mt-4">
              <Filters filters={filters} setFilters={setFilters} disabled={loading || !items.length} />
            </div>
          </section>
          <section className="lg:col-span-8">
            <StatsBar profile={profile} stats={stats} loading={loading} error={error} />
            <div className="mt-4">
              <ResultsGrid items={results} loading={loading} />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
