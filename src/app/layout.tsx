import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
