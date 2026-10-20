import type { ReactNode } from "react";
import Reveal from "./Reveal";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { Eyebrow } from "./ui";

export default function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="mx-auto w-full max-w-content px-4 pt-36 pb-6 md:px-8 md:pt-44">
      <Breadcrumbs items={crumbs} />
      <Reveal immediate>
        <div className="mt-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-h1 font-semibold">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          )}
        </div>
      </Reveal>
    </header>
  );
}
