import type { ImageLoaderProps } from 'next/image';

export default function shopifyImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith('/')) return src;

  const url = new URL(src);
  url.searchParams.set('width', width.toString());
  if (quality) {
    url.searchParams.set('quality', quality.toString());
  }
  return url.toString();
}
