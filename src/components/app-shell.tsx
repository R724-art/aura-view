import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Bookmark, Compass, FolderHeart, History, Home, Menu, Search, Upload, UserRound, Video, Zap } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { videos } from "@/lib/videos";

const navItems = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Browse", icon: Compass, to: "/" },
  { label: "Collections", icon: FolderHeart, to: "/" },
  { label: "Subscriptions", icon: Zap, to: "/" },
  { label: "Watch later", icon: Bookmark, to: "/" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const results = query.trim() ? videos.filter((video) => `${video.title} ${video.channel} ${video.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : [];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowResults(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="flex h-full items-center gap-3 px-4 md:gap-6 md:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={() => setMenuOpen((open) => !open)}><Menu className="size-5" /></Button>
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Carbon Signal home">
            <span className="grid size-9 place-items-center bg-primary font-display text-lg font-bold text-primary-foreground">C</span>
            <span className="hidden font-display text-[15px] font-bold sm:block">CARBON SIGNAL</span>
          </Link>
          <form onSubmit={submitSearch} className="relative mx-auto w-full max-w-[520px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(event) => { setQuery(event.target.value); setShowResults(true); }} onFocus={() => setShowResults(true)} aria-label="Search films, channels, collections" placeholder="Search films, channels, collections" className="h-10 w-full rounded-md border border-border bg-background/80 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary" />
            {showResults && query && (
              <div className="glass-3 absolute left-0 right-0 top-12 overflow-hidden rounded-md p-2 shadow-2xl">
                {results.length ? results.map((video) => (
                  <Link key={video.id} to="/watch/$videoId" params={{ videoId: video.id }} onClick={() => setShowResults(false)} className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-accent">
                    <img src={video.image} alt="" className="h-10 w-16 rounded object-cover" />
                    <span className="min-w-0"><strong className="block truncate">{video.title}</strong><span className="text-xs text-muted-foreground">{video.channel}</span></span>
                  </Link>
                )) : <p className="p-3 text-sm text-muted-foreground">No films found for “{query}”</p>}
              </div>
            )}
          </form>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Button className="hidden md:inline-flex"><Upload className="size-4" />Upload</Button>
            <Button variant="icon" size="icon" aria-label="Notifications"><Bell className="size-4" /></Button>
            <Button variant="icon" size="icon" aria-label="Profile"><UserRound className="size-4" /></Button>
          </div>
        </div>
      </header>

      <aside className={`fixed bottom-0 left-0 top-16 z-40 w-60 border-r border-border bg-background/95 px-4 py-6 backdrop-blur-xl transition-transform md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="space-y-1" aria-label="Primary navigation">
          {navItems.map(({ label, icon: Icon, to }, index) => {
            const active = index === 0 && pathname === "/";
            return <Link key={label} to={to} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}><Icon className="size-4" />{label}</Link>;
          })}
        </nav>
        <div className="mt-8 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Channels</div>
        <div className="mt-3 space-y-2">
          {["Northlight Films", "Aperture Weekly", "Studio Meridian"].map((channel, index) => <div key={channel} className="flex items-center gap-3 px-3 py-1.5"><span className={`grid size-8 place-items-center rounded-md border border-border ${index === 1 ? "bg-primary/10 text-primary" : "bg-card text-muted-foreground"}`}><Video className="size-3.5" /></span><span className="text-sm">{channel}</span></div>)}
        </div>
        <div className="absolute bottom-5 left-4 right-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">Curated independent cinema.<br />New signals every Friday.</div>
      </aside>

      <main className="min-w-0 pt-16 md:pl-60">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card/90 px-4 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        <Link to="/" className="flex flex-col items-center gap-1 text-[10px] text-primary"><Home className="size-5" />Home</Link>
        <button type="button" onClick={() => document.querySelector<HTMLInputElement>('input[aria-label="Search films, channels, collections"]')?.focus()} className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground"><Search className="size-5" />Search</button>
        <Link to="/watch/$videoId" params={{ videoId: "weight-of-light" }} className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground"><Video className="size-5" />Watch</Link>
        <span className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground"><History className="size-5" />History</span>
      </nav>
    </div>
  );
}