import { Providers } from "@/components/Providers";
import VisualFeedback from "@/components/VisualFeedback";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://litgenics.github.io/portfolio/'),
  title: {
    default: "M. Hamza Shaikh | litgenics - English Coach & Software Expert",
    template: "%s | litgenics"
  },
  description: "Uplift your professional career with expert English coaching and high-end software solutions. Specializing in Business English, IELTS, SAT, Web Design, and SEO.",
  keywords: ["M. Hamza Shaikh", "litgenics", "English Coach Pakistan", "Software Solutions Dubai", "SEO Expert Gulf", "IELTS Preparation Online", "SAT Coaching"],
  openGraph: {
    title: "M. Hamza Shaikh | litgenics - English Coach & Software Expert",
    description: "Professional English coaching and complete software solutions for the global market.",
    url: 'https://litgenics.github.io/portfolio/',
    siteName: 'litgenics',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Hamza Shaikh | litgenics',
    description: 'Bridging the gap between Language and Technology.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/portfolio/manifest.json',
  alternates: {
    canonical: 'https://litgenics.github.io/portfolio/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "M. Hamza Shaikh",
    "url": "https://litgenics.github.io/portfolio/",
    "jobTitle": "English Coach & Software Expert",
    "worksFor": {
      "@type": "Organization",
      "name": "litgenics"
    },
    "sameAs": [
      "https://www.linkedin.com/in/litgenics",
      "https://github.com/litgenics",
      "https://twitter.com/litgenics"
    ],
    "description": "Professional English coach and software developer helping professionals uplift their careers through language and technology."
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
          <VisualFeedback />
        </Providers>
      </body>
    </html>
  );
}
