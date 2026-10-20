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
        <h2 className="mt-block font-display text-h2 font-semibold">
          {title}
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="h-full">
            <Reveal delay={i * 60} className="h-full">
              <div className="h-full rounded-md border border-hairline bg-raised shadow-e1">
                <div className="h-full p-6">
                  <span className="font-display text-sm font-semibold tracking-widest text-accent-fg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
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
