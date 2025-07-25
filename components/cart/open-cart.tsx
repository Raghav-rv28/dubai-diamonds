import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1.5 -mt-1.5 flex h-4 w-4 items-center justify-center rounded-sm bg-black text-[12px] font-medium text-white dark:bg-white dark:text-black">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
