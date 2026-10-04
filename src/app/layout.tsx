import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RCB Holdings | Industrial Interlock Paving & Machinery Sri Lanka",
  description:
    "Engineering-grade interlock paving, cement blocks and heavy construction machinery from RCB Holdings, Sri Lanka. SDLG, Yineng, Noah, and Shengya authorized distributor.",
  metadataBase: new URL("https://rcb.lk"),
  openGraph: {
    title: "RCB Holdings — Build Something That Lasts.",
    description:
      "Engineering-grade interlock paving and heavy construction machinery in Sri Lanka.",
    type: "website",
    locale: "en_LK",
    images: [{ url: "/paving-after.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--canvas)] text-[var(--slate-body)] font-sans antialiased selection:bg-[var(--theme)] selection:text-white" suppressHydrationWarning>
        <a href="#main" className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--theme)] focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs rounded-md">
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
