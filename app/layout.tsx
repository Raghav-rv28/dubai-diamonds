import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "components/cart/cart-context";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Footer from "../components/layout/footer-two";
import "./globals.css";
const { SITE_NAME } = process.env;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={spaceGrotesk.className} suppressHydrationWarning>
      <body className="bg-neutral-50 text-black  dark:bg-neutral-900 dark:text-white ">
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
        <Footer/>
       </ThemeProvider>
       <Analytics />
      </body>
    </html>
  );
}
