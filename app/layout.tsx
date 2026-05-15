import type { Metadata } from "next";
import "./globals.css";
import PublicChrome from "@/components/PublicChrome";

export const metadata: Metadata = {
  title: {
    default: "Chhajed Estate | Premium Real Estate Consultancy, Pune",
    template: "%s | Chhajed Estate",
  },
  description:
    "Chhajed Estate — Unlock Maximum Value for Your Project with Our Expertise. Premium real estate consultancy specializing in builder project sales, luxury apartments, and exclusive property solutions in Pune.",
  keywords: [
    "Chhajed Estate",
    "real estate Pune",
    "luxury apartments Pune",
    "property consultancy Pune",
    "2BHK 3BHK Pune",
    "builder projects Pune",
    "Kondhwa real estate",
  ],
  openGraph: {
    title: "Chhajed Estate | Premium Real Estate Consultancy, Pune",
    description:
      "Unlock Maximum Value for Your Project with Our Expertise. Premium properties, builder partnerships, and exclusive luxury housing in Pune.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
