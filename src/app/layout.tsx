import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intel Series 3 — YOUR DAY. YOUR POWER.",
  description: "Intel Core Ultra Series 3 and Intel Core Series 3. The first client processors engineered on Intel 18A manufacturing technology.",
  keywords: ["Intel Core Ultra Series 3", "Intel Core Series 3", "Intel 18A", "Panther Lake", "Wildcat Lake", "RibbonFET", "PowerVia"],
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
