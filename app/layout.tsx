import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "components/cart/cart-context";
import LoadingDots from "components/loading-dots";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import Footer from "../components/layout/footer-two";
import "./globals.css";
const { SITE_NAME } = process.env;
const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});


export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: !isMaintenanceMode,
    index: !isMaintenanceMode,
  },
};


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (isMaintenanceMode) {
    return (
      <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} font-body`} suppressHydrationWarning>
        <body className="bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense
              fallback={
                <div className="flex w-full items-center justify-center py-6">
                  <LoadingDots className="bg-black dark:bg-white" />
                </div>
              }
            >
              <main>{children}</main>
            </Suspense>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    );
  }

  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cormorant.variable} font-body`} suppressHydrationWarning>
      <body className="bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white">
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <CartProvider cartPromise={cart}>
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center py-6">
                <LoadingDots className="bg-black dark:bg-white" />
              </div>
            }
          >
            <Navbar />
            <main>
              {children}
              <Toaster closeButton />
            </main>
          </Suspense>
        </CartProvider>
        <Footer/>
       </ThemeProvider>
       <Analytics />
      </body>
    </html>
  );
}
