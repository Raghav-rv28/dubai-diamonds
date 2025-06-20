"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams?.get("q") || "");

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <Input
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 flex h-full items-center hover:cursor-pointer">
        <Button onClick={handleSearch} variant="ghost" className="rounded-lg">
          <MagnifyingGlassIcon className="h-4" />
        </Button>
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <Input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 flex h-full items-center">
        <Button variant="ghost" className="rounded-lg">
          <MagnifyingGlassIcon className="h-4" />
        </Button>
      </div>
    </div>
  );
}