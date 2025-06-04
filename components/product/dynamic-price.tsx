'use client';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { useProduct } from './product-context';

export function DynamicPrice({ product }: { product: Product }) {
  const { state } = useProduct();

  // Find the current variant based on selected options
  const getCurrentVariant = () => {
    // If no options are selected, return null to show default pricing
    const selectedOptions = Object.entries(state).filter(([key, value]) => 
      key !== 'image' && value // Exclude image and ensure value exists
    );

    if (selectedOptions.length === 0) {
      return null;
    }

    // Find variant that matches all selected options
    return product.variants.find(variant => 
      selectedOptions.every(([optionName, optionValue]) =>
        variant.selectedOptions.some(variantOption =>
          variantOption.name.toLowerCase() === optionName.toLowerCase() && 
          variantOption.value === optionValue
        )
      )
    );
  };

  const currentVariant = getCurrentVariant();
  
  // Use current variant price if available, otherwise fall back to product price range
  const displayPrice = currentVariant 
    ? {
        amount: currentVariant.price.amount,
        currencyCode: currentVariant.price.currencyCode
      }
    : {
        amount: product.priceRange.maxVariantPrice.amount,
        currencyCode: product.priceRange.maxVariantPrice.currencyCode
      };

  return (
    <Price
      amount={displayPrice.amount}
      currencyCode={displayPrice.currencyCode}
    />
  );
}