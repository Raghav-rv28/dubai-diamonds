import { cn } from '@/lib/utils';
import { AddToCart } from 'components/cart/add-to-cart';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import { DynamicPrice } from './dynamic-price';
import { ProductMetafields } from './product-metafields';
import { VariantSelector } from './variant-selector';

const Giestfont = Geist({
  weight: ["500"],
  subsets: ["latin"]
})
export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-black dark:bg-white p-2 text-sm text-white dark:text-black">
          <DynamicPrice product={product} />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className={cn("mb-6 text-sm leading-tight dark:text-white/[60%]",Giestfont.className)}
          html={product.descriptionHtml}
        />
      ) : null}
      <ProductMetafields metafields={product.metafields.filter((m)=> m!==null)} options={product.options}/>
      <AddToCart product={product} />
      <Link href='https://calendly.com/dubai-diamonds103/30min' target="_blank" className='mt-4 relative flex w-full items-center justify-center rounded-full 
      bg-white dark:bg-black dark:text-white p-4 tracking-wide text-black border-black border-2
       dark:border-white hover:cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800' >Try In Store</Link>
    </>
  );
}
