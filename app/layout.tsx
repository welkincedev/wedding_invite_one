import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Aleena Siyad & Siyad T N — The Sage Heirloom Wedding Invitation",
  description:
    "Together with their families, Aleena Siyad & Siyad T N cordially invite you to celebrate their Nikah ceremony on Sunday, 13 December 2026.",
  authors: [{ name: "found.bin" }],
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/favicon.svg"
  },
  openGraph: {
    type: "website",
    title: "Aleena Siyad & Siyad T N — Nikah Wedding Invitation",
    description:
      "Together with their families, Aleena Siyad & Siyad T N cordially invite you to celebrate their Nikah ceremony on Sunday, 13 December 2026.",
    images: [
      {
        url: "/assets/gallery/gallery-suite.jpg",
        width: 1200,
        height: 630,
        alt: "Aleena Siyad & Siyad T N Wedding Invitation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aleena Siyad & Siyad T N — Nikah Wedding Invitation",
    description:
      "Nikah Ceremony & Wedding Celebration on Sunday, 13 December 2026.",
    images: ["/assets/gallery/gallery-suite.jpg"]
  }
};

export const viewport: Viewport = {
  themeColor: "#343C32",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
