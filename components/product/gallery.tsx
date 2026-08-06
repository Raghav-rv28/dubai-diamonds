'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    'flex h-full items-center justify-center px-5 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white';

  return (
    <form className="flex w-full flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 sm:aspect-square lg:min-h-[min(65vh,640px)]">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain p-2 sm:p-4"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-11 items-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900">
            <button
              formAction={() => {
                const newState = updateImage(previousImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Previous product image"
              className={buttonClassName}
            >
              <ArrowLeftIcon className="h-5" />
            </button>
            <div className="mx-1 h-6 w-px bg-neutral-400 dark:bg-neutral-600" />
            <button
              formAction={() => {
                const newState = updateImage(nextImageIndex.toString());
                updateURL(newState);
              }}
              aria-label="Next product image"
              className={buttonClassName}
            >
              <ArrowRightIcon className="h-5" />
            </button>
          </div>
          <p className="text-sm tabular-nums text-neutral-500 dark:text-neutral-400">
            {imageIndex + 1} / {images.length}
          </p>
        </div>
      ) : null}

      {images.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label={`Select product image ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
