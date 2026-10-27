import type { Metadata, Viewport } from "next";
import { assetPath } from "@/data/weddingConfig";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://welkincedev.github.io/wedding_invite_one"
      : "http://localhost:3000"
  ),
  title: "Aleena Siyad & Siyad T N — The Sage Heirloom Wedding Invitation",
  description:
    "Together with their families, Aleena Siyad & Siyad T N cordially invite you to celebrate their Nikah ceremony on Sunday, 13 December 2026.",
  authors: [{ name: "found.bin" }],
  icons: {
    icon: assetPath("/assets/favicon.svg"),
    apple: assetPath("/assets/favicon.svg")
  },
  openGraph: {
    type: "website",
    title: "Aleena Siyad & Siyad T N — Nikah Wedding Invitation",
    description:
      "Together with their families, Aleena Siyad & Siyad T N cordially invite you to celebrate their Nikah ceremony on Sunday, 13 December 2026.",
    images: [
      {
        url: assetPath("/assets/gallery/gallery-suite.jpg"),
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
    images: [assetPath("/assets/gallery/gallery-suite.jpg")]
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
  const paperTextureUrl = assetPath("/assets/paper-texture.webp");
  const faviconUrl = assetPath("/assets/favicon.svg");

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href={faviconUrl} />
        <style
          id="paper-bg-inject"
          dangerouslySetInnerHTML={{
            __html: `:root { --bg-paper-url: url("${paperTextureUrl}"); }`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
