import Link from "next/link";
import { IconArrowUpRight } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <span
        aria-hidden="true"
        className="font-display text-8xl font-bold tracking-tight text-ink/10 md:text-9xl"
      >
        404
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
        Deze pagina hangt hier niet
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
        De pagina die u zoekt bestaat niet (meer). Geen zorgen — via
        onderstaande knoppen bent u zo weer op weg.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full bg-ink py-2.5 pr-2.5 pl-6 text-sm font-semibold text-cream transition-transform duration-300 ease-fluid active:scale-[0.98]"
        >
          Naar de homepage
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-spring group-hover:-translate-y-px group-hover:translate-x-0.5">
            <IconArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
        <Link
          href="/diensten"
          className="flex items-center rounded-full px-6 py-3.5 text-sm font-semibold ring-1 ring-ink/15 transition-colors duration-300 ease-fluid hover:bg-ink/5"
        >
          Bekijk diensten
        </Link>
        <Link
          href="/contact"
          className="flex items-center rounded-full px-6 py-3.5 text-sm font-semibold ring-1 ring-ink/15 transition-colors duration-300 ease-fluid hover:bg-ink/5"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
