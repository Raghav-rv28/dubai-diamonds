'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useOptimistic } from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string | null) => ProductState; // Allow null to clear
  updateImage: (index: string) => ProductState;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  
  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState | { [key: string]: null }) => {
      const newState = { ...prevState };
      
      // Handle clearing options (when value is null)
      Object.entries(update).forEach(([key, value]) => {
        if (value === null) {
          delete newState[key]; // Remove the key entirely
        } else {
          newState[key] = value;
        }
      });
      
      return newState;
    }
  );

  const updateOption = (name: string, value: string | null) => {
    let newState: ProductState;
    
    if (value === null) {
      // Create new state without this option
      const { [name]: removed, ...rest } = state;
      newState = rest;
      setOptimisticState({ [name]: null }); // Signal to remove this key
    } else {
      newState = { ...state, [name]: value };
      setOptimisticState({ [name]: value });
    }
    
    return newState;
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();
  
  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    
    // Clear all existing params that might be product options
    // then set only the ones in the new state
    const currentParams = Array.from(newParams.keys());
    currentParams.forEach(key => {
      if (key !== 'image') { // Preserve non-option params if needed
        newParams.delete(key);
      }
    });
    
    // Set the new state params
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}