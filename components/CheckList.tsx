import { IconCheck } from "./icons";

/**
 * Gedeelde checklijst met amber vinkje — één bron voor het veel herhaalde
 * "voordeel-lijst"-patroon. `medium` maakt de items iets zwaarder (font-medium).
 */
export default function CheckList({
  items,
  className = "",
  medium = false,
}: {
  items: string[];
  className?: string;
  medium?: boolean;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-[15px] ${medium ? "font-medium" : ""}`}
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600/10 text-amber-700">
            <IconCheck className="h-3.5 w-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
