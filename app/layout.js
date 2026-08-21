import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AnalyticsEvents from "./AnalyticsEvents";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://solotools-1ou.pages.dev"),

  title: {
    default: "SoloTools - Free Tools for Freelancers",
    template: "%s | SoloTools",
  },

  description:
    "Free calculators and practical business tools for freelancers, consultants, creators and independent professionals.",

  keywords: [
    "freelance tools",
    "freelance calculator",
    "hourly rate calculator",
    "freelance hourly rate",
    "project price calculator",
    "freelance income calculator",
    "freelancer tools",
  ],

  authors: [
    {
      name: "SoloTools",
    },
  ],

  creator: "SoloTools",

  openGraph: {
    title: "SoloTools - Free Tools for Freelancers",
    description:
      "Free calculators and practical guides for freelancers and independent professionals.",
    url: "https://solotools-1ou.pages.dev",
    siteName: "SoloTools",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <AnalyticsEvents />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2JQK2RGBJJ"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2JQK2RGBJJ');
          `}
        </Script>
      </body>
    </html>
  );
}
