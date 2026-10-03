import Link from "next/link";
import { TrackNotFound } from "@/components/site/track-not-found";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <TrackNotFound />
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-primary-text">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground">This page doesn&rsquo;t exist</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">The link may be old or mistyped. Everything we do is on the home page.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Go to afridev.io
        </Link>
      </div>
    </main>
  );
}
