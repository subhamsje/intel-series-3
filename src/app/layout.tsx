import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intel Series 3 — YOUR DAY. YOUR POWER.",
  description: "Intel Core Ultra Series 3 and Intel Core Series 3. Built on the shared foundation of Intel 18A process technology.",
  keywords: ["Intel Core Ultra Series 3", "Intel Core Series 3", "Intel 18A", "Panther Lake", "Wildcat Lake", "RibbonFET", "PowerVia", "AI PC"],
  openGraph: {
    title: "Intel Series 3 — YOUR DAY. YOUR POWER.",
    description: "One Foundation. Two Directions. Your Choice.",
    type: "website",
    locale: "en_US",
    siteName: "Intel Series 3 Cinematic Experience",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intel Series 3 — YOUR DAY. YOUR POWER.",
    description: "One Foundation. Two Directions. Your Choice.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#050608]">
      <body className="bg-[#050608] text-[#F8FAFC] antialiased selection:bg-[#0068B5] selection:text-white">
        {children}
      </body>
    </html>
  );
}
