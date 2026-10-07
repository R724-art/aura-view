import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Check, Heart, Maximize, Pause, Play, Settings, Share2, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/video-card";
import { featuredVideo, videos } from "@/lib/videos";

export const Route = createFileRoute("/watch/$videoId")({
  head: () => ({
    meta: [
      { title: "Watch — Carbon Signal" },
      { name: "description", content: "Watch independent films and original documentaries on Carbon Signal." },
      { property: "og:title", content: "Watch on Carbon Signal" },
      { property: "og:description", content: "Watch independent films and original documentaries on Carbon Signal." },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const { videoId } = Route.useParams();
  const video = useMemo(() => [featuredVideo, ...videos].find((item) => item.id === videoId) ?? featuredVideo, [videoId]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(38);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <AppShell>
      <div className="grid gap-7 px-4 py-5 pb-24 sm:px-6 md:px-8 md:py-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <section className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-card" aria-label={`Video player for ${video.title}`}>
            <img src={video.image} alt="" width={1920} height={1088} className={`h-full w-full object-cover transition-opacity ${playing ? "opacity-90" : "opacity-75"}`} />
            <button type="button" aria-label={playing ? "Pause video" : "Play video"} onClick={() => setPlaying((value) => !value)} className="absolute inset-0 grid place-items-center">
              <span className="glass-2 grid size-16 place-items-center rounded-full text-primary">{playing ? <Pause className="size-7 fill-current" /> : <Play className="ml-1 size-7 fill-current" />}</span>
            </button>
            <div className="player-controls absolute inset-x-0 bottom-0 z-10 bg-player-controls px-4 pb-3 pt-12">
              <input aria-label="Video progress" type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(Number(event.target.value))} className="accent-primary h-1 w-full cursor-pointer" />
              <div className="mt-3 flex items-center gap-3">
                <Button variant="ghost" size="icon" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}</Button>
                <Volume2 className="size-4" /><span className="text-xs">34:58 / 1:32:10</span>
                <div className="ml-auto flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Player settings"><Settings className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Fullscreen"><Maximize className="size-4" /></Button></div>
              </div>
            </div>
          </section>

          <h1 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{video.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{video.views} · Premiered Oct 4, 2026</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-border pb-5">
            <div className="grid size-10 place-items-center rounded-md border border-border bg-card font-display font-bold text-primary">N</div>
            <div><p className="text-sm font-semibold">{video.channel}</p><p className="text-xs text-muted-foreground">128K subscribers</p></div>
            <Button className="mr-auto" variant={subscribed ? "glass" : "default"} onClick={() => setSubscribed((value) => !value)}>{subscribed && <Check className="size-4" />}{subscribed ? "Subscribed" : "Subscribe"}</Button>
            <Button variant={liked ? "default" : "glass"} onClick={() => setLiked((value) => !value)}><Heart className={`size-4 ${liked ? "fill-current" : ""}`} />2.8K</Button>
            <Button variant="glass"><Share2 className="size-4" />Share</Button>
            <Button variant={saved ? "default" : "glass"} onClick={() => setSaved((value) => !value)}><Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />Save</Button>
          </div>
          <div className="mt-5 rounded-md border border-border bg-card/60 p-4 text-sm leading-relaxed text-foreground/75">
            <strong className="text-foreground">The story behind the signal.</strong><br />A sculptor races a collapsing glacier in a documentary shot entirely on expired 16mm. Restored frame by frame, this intimate film studies what remains when a landscape begins to disappear.
          </div>
          <section className="mt-8">
            <h2 className="font-display text-lg font-bold">412 comments</h2>
            <div className="mt-5 flex gap-3 border-b border-border pb-5"><div className="grid size-9 shrink-0 place-items-center rounded-md bg-card text-xs font-bold">MT</div><div><p className="text-sm font-semibold">Mira T. <span className="font-normal text-muted-foreground">· 2h ago</span></p><p className="mt-1 text-sm text-foreground/80">The glacier sequence rewound me twice. The sound design is unreal.</p></div></div>
            <div className="mt-5 flex gap-3"><div className="grid size-9 shrink-0 place-items-center rounded-md bg-card text-xs font-bold">AK</div><div><p className="text-sm font-semibold">Anton K. <span className="font-normal text-muted-foreground">· 5h ago</span></p><p className="mt-1 text-sm text-foreground/80">Every frame feels deliberate without ever feeling staged.</p></div></div>
          </section>
        </div>
        <aside>
          <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Up next</h2><span className="text-xs text-muted-foreground">Autoplay on</span></div>
          <div className="mt-4 space-y-3">{videos.filter((item) => item.id !== video.id).slice(0, 7).map((item) => <VideoCard key={item.id} video={item} compact />)}</div>
        </aside>
      </div>
    </AppShell>
  );
}