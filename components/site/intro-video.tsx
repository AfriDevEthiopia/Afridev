"use client";

import Image from "next/image";
import { useState } from "react";
import { LINKS } from "@/lib/site";
import { PlayIcon } from "./icons";

/** Thumbnail first; the YouTube player only loads after a click. */
export function IntroVideo() {
  const [playing, setPlaying] = useState(false);
  const id = LINKS.introVideoId;

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-foreground shadow-lg">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title="AfriDev introduction video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label="Play the AfriDev introduction video"
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-foreground shadow-lg transition-transform group-hover:scale-[1.03]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
              </span>
              Watch the intro
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-[13px] text-muted-foreground">Who we are and how we work</figcaption>
    </figure>
  );
}
