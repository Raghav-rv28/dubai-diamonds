'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function LabNaturalCheckbox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const value = searchParams.get('tag');

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value === "All"){
        params.delete("tag");
    } else {
        params.set('tag', value);
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 pt-4">
        <label className="flex w-full items-center gap-2 text-sm md:text-base">
        <input
          type="radio"
          checked={!value || value === 'All'}
          onChange={() => handleChange('All')}
          className="h-4 w-4"
        />
        All
      </label>
      <label className="flex w-full items-center gap-2 text-sm md:text-base">
        <input
          type="radio"
          checked={value === 'Natural'}
          onChange={() => handleChange('Natural')}
          className="h-4 w-4"
        />
        Natural
      </label>
      <label className="flex w-full items-center gap-2 text-sm md:text-base">
        <input
          type="radio"
          checked={value === 'Lab'}
          onChange={() => handleChange('Lab')}
          className="h-4 w-4"
        />
        Lab
      </label>
    </div>
  );
}