import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

import type { Video } from "@/lib/videos";

export function VideoCard({ video, compact = false }: { video: Video; compact?: boolean }) {
  if (compact) {
    return (
      <Link to="/watch/$videoId" params={{ videoId: video.id }} className="group flex min-w-0 gap-3 rounded-md p-1 transition-colors hover:bg-accent/60">
        <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md border border-border">
          <img src={video.image} alt="" width={1088} height={608} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          <span className="absolute bottom-1 right-1 rounded-sm bg-background/80 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">{video.duration}</span>
        </div>
        <div className="min-w-0 py-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">{video.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
          <p className="text-xs text-muted-foreground">{video.views}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/watch/$videoId" params={{ videoId: video.id }} className="group block min-w-0">
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-card">
        <img src={video.image} alt="" width={1088} height={608} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
        <span className="absolute right-2 top-2 rounded-sm bg-background/80 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">{video.duration}</span>
        <span className="absolute inset-0 grid place-items-center bg-background/0 opacity-0 transition-all group-hover:bg-background/20 group-hover:opacity-100">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><Play className="size-4 fill-current" /></span>
        </span>
        {video.progress !== undefined && <span className="absolute inset-x-0 bottom-0 h-1 bg-foreground/15"><span className="block h-full bg-primary" style={{ width: `${video.progress}%` }} /></span>}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">{video.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{video.channel} · {video.views}</p>
    </Link>
  );
}