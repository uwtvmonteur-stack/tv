import Reveal from "./Reveal";

export default function Stappen({
  title = "Zo werkt het",
  steps,
}: {
  title?: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <>
      <Reveal>
        <h2 className="mt-20 font-display text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="h-full">
            <Reveal delay={i * 60} className="h-full">
              <div className="h-full rounded-[1.75rem] bg-ink/[0.04] p-1.5 ring-1 ring-ink/5">
                <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-white p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                  <span className="font-display text-sm font-bold tracking-widest text-amber-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}
