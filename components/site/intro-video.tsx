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
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 text-xs font-semibold text-foreground shadow-lg transition-transform group-hover:scale-[1.03] sm:bottom-4 sm:left-4 sm:gap-2.5 sm:py-1.5 sm:pl-1.5 sm:pr-4 sm:text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white sm:h-7 sm:w-7">
                <PlayIcon className="ml-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
