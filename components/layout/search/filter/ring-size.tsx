"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

export default function RingSizeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [options, setOptions] = useState<string[]>([]);

  const selected = searchParams.get("ringSize") || "";

  // Build URL for server action to get sizes based on current query params
  const queryForApi = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    return `/api/search/ring-sizes?${params.toString()}`;
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    fetch(queryForApi, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { sizes: string[] }) => {
        if (!cancelled) setOptions(data.sizes ?? []);
      })
      .catch(() => setOptions([]));
    return () => {
      cancelled = true;
    };
  }, [queryForApi]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("ringSize");
    } else {
      params.set("ringSize", value);
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  if (!options.length) return null;

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 pt-4">
      <h4 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Ring Size</h4>
      <div className="flex flex-col gap-2">
        <label className="flex w-full items-center gap-2 text-sm md:text-base">
          <input
            type="radio"
            checked={!selected}
            onChange={() => handleChange("")}
            className="h-4 w-4"
          />
          All
        </label>
        {options.map((opt) => (
          <label key={opt} className="flex w-full items-center gap-2 text-sm md:text-base">
            <input
              type="radio"
              checked={selected === opt}
              onChange={() => handleChange(opt)}
              className="h-4 w-4"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}