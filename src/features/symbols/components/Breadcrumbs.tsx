import Link from "next/link";

/** Sichtbarer Brotkrumenpfad (ergänzt das BreadcrumbList-JSON-LD). */
export function Breadcrumbs({
  items,
}: {
  items: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="Brotkrumenpfad" className="text-xs text-moon-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.path ? (
              <Link href={item.path} className="hover:text-moon-100">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-moon-300">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
