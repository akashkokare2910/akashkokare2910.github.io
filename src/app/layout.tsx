import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://akashkokare2910.github.io"),
  title: "Akash Kokare — Applied AI Engineer",
  description:
    "Applied AI engineer building reliable agents, production forecasting systems, MCP tooling, and the interfaces people use.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "Akash Kokare — Applied AI Engineer",
    description: "AI systems should behave like dependable software.",
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Akash Kokare",
    url: "https://akashkokare2910.github.io/",
    jobTitle: "AI Engineer",
    worksFor: { "@type": "Organization", name: "Birla AI Labs" },
    sameAs: [
      "https://github.com/akashkokare2910",
      "https://linkedin.com/in/akash-kokare13bz",
      "https://pypi.org/project/mcplint-cli/",
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
