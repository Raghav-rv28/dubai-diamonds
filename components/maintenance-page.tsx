'use client';

import { motion } from 'framer-motion';
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './layout/navbar/logo';

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-neutral-50 px-6 py-16 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-40"
        style={{
          background:
            'radial-gradient(600px circle at 20% 20%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(500px circle at 80% 70%, rgba(212,175,55,0.10), transparent 60%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex w-full max-w-2xl flex-col items-center gap-8 text-center"
      >
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            Under Maintenance
          </span>
          <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            We&rsquo;re polishing things up
          </h1>
          <p className="text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
            Our online store is temporarily unavailable while we make a few refinements.
            Thank you for your patience &mdash; we&rsquo;ll be back with something brilliant very
            soon.
          </p>
        </div>

        <div className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white/60 p-6 text-left shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            Visit us or get in touch
          </p>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
              <span>2700 N Park Dr, Brampton, ON L6S 0E9</span>
            </div>
            <div className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
              <Link
                href="tel:+14164651200"
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                +1 (416) 465-1200
              </Link>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2 sm:justify-center">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" />
              <Link
                href="mailto:info@dubaidiamonds.ca"
                className="transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                info@dubaidiamonds.ca
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            Follow us
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/dubai.diamondss/"
              target="_blank"
              aria-label="Instagram"
              className="rounded-full border border-neutral-200 p-2.5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <InstagramIcon className="h-5 w-5 text-pink-500" />
            </Link>
            <Link
              href="https://www.tiktok.com/@dubai.diamondss"
              target="_blank"
              aria-label="TikTok"
              className="rounded-full border border-neutral-200 p-2.5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <Image
                unoptimized
                src="/tiktok.svg"
                alt="TikTok"
                width={20}
                height={20}
                className="dark:invert"
              />
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
          &copy; {new Date().getFullYear()} Dubai Diamonds. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
