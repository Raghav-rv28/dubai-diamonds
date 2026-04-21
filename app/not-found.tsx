import Logo from '@/components/layout/navbar/logo';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
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

      <div className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
            404
          </span>
          <span className="h-px w-10 bg-neutral-300 dark:bg-neutral-700" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            Page not found
          </h1>
          <p className="text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">
            The page you&rsquo;re looking for isn&rsquo;t available right now. Our site is
            currently under maintenance &mdash; please check back with us shortly.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
