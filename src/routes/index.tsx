import { Link, createFileRoute } from "@tanstack/react-router";
import { BookmarkPlus, Play } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/video-card";
import { categories, featuredVideo, videos } from "@/lib/videos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carbon Signal — Independent cinema, in focus" },
      { name: "description", content: "Discover original documentaries, short films, and visual stories curated by Carbon Signal." },
      { property: "og:title", content: "Carbon Signal — Independent cinema, in focus" },
      { property: "og:description", content: "Discover original documentaries, short films, and visual stories curated by Carbon Signal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState(false);
  const filteredVideos = useMemo(() => category === "All" || category === "Shorts" ? videos : videos.filter((video) => video.category === category), [category]);

  return (
    <AppShell>
      <div className="px-4 py-5 pb-24 sm:px-6 md:px-8 md:py-8">
        <section className="relative min-h-[430px] overflow-hidden rounded-lg border border-border bg-card sm:min-h-[500px]">
          <img src={featuredVideo.image} alt="A lone figure crossing a viaduct beneath a glacier" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero-shade" />
          <div className="hero-slashes pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><span /><span /><span /></div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-5 sm:p-8">
            <div className="max-w-xl">
              <span className="glass-1 inline-flex rounded-md px-3 py-1 text-[11px] font-semibold uppercase text-primary">Featured premiere</span>
              <h1 className="mt-4 max-w-[12ch] font-display text-4xl font-bold leading-[1.02] sm:text-5xl">The Weight of Light</h1>
              <p className="mt-3 max-w-[45ch] text-sm text-foreground/75">A sculptor races a collapsing glacier in a documentary shot entirely on expired 16mm.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild><Link to="/watch/$videoId" params={{ videoId: featuredVideo.id }}><Play className="size-4 fill-current" />Play now</Link></Button>
                <Button size="lg" variant="glass" onClick={() => setSaved((value) => !value)}><BookmarkPlus className="size-4" />{saved ? "Saved" : "Add to list"}</Button>
                <span className="text-xs text-muted-foreground">92 min · 2024 · 4K HDR</span>
              </div>
            </div>
            <div className="glass-2 hidden h-10 items-end gap-1 rounded-md px-3 py-2 sm:flex" aria-label="Audio playing">
              {[900, 1100, 700, 1300].map((duration) => <span key={duration} className="eq-bar w-1 origin-bottom bg-primary" style={{ animationDuration: `${duration}ms` }} />)}
            </div>
          </div>
        </section>

        <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Video categories">
          {categories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "glass"} onClick={() => setCategory(item)} className="shrink-0">{item}</Button>)}
        </div>

        <section className="mt-9">
          <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-xl font-bold">Continue watching</h2><p className="hidden text-xs text-muted-foreground sm:block">Resume where the reel stopped</p></div>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">{videos.slice(0, 4).map((video) => <VideoCard key={video.id} video={video} />)}</div>
        </section>

        <section className="mt-11">
          <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-xl font-bold">Editor's picks</h2><p className="hidden text-xs text-muted-foreground sm:block">Curated weekly by the Signal desk</p></div>
          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">{filteredVideos.map((video) => <VideoCard key={video.id} video={video} />)}</div>
        </section>
      </div>
    </AppShell>
  );
}
