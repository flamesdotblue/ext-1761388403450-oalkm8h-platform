import Spline from '@splinetool/react-spline'
import { Rocket } from 'lucide-react'

export default function Hero() {
  return (
    <header className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-6">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Rocket className="h-3.5 w-3.5 text-fuchsia-400" />
              Social Performance Explorer
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Sort any Instagram Reels and TikTok profile by performance
            </h1>
            <p className="mt-3 max-w-xl text-white/70">
              Paste a username or profile URL. We’ll fetch their public short-form videos and let you sort by views, likes, comments, shares, saves, engagement rate, and more.
            </p>
          </div>
          <div className="hidden h-[260px] w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl md:block">
            <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          </div>
        </div>
      </div>
    </header>
  )
}
