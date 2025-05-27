'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function InStockCheckbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isChecked = searchParams.get('available') === 'true';

  const handleChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      params.delete('available');
    } else {
      params.set('available', 'true');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="w-full">
      <label className="flex w-full items-center gap-2 text-sm md:text-base">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="h-4 w-4"
        />
        In Stock
      </label>
    </div>
  );
}
       