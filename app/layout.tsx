import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";
import StickyPhoneBar from "@/components/ui/StickyPhoneBar";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "City in Health | İstanbul Evde Sağlık Hizmetleri",
    template: "%s | City in Health",
  },
  description:
    "İstanbul genelinde 7/24 evde sağlık hizmeti. Evde serum, hemşirelik, yaşlı bakımı, fizyoterapi ve daha fazlası. Profesyonel ekibimizle yanınızdayız.",
  keywords: [
    "City in Health",
    "cityinhealth",
    "evde sağlık",
    "evde sağlık hizmeti",
    "evde bakım",
    "evde hemşirelik",
    "evde serum",
    "evde serum İstanbul",
    "İstanbul evde sağlık",
    "evde fizyoterapi",
    "evde fizik tedavi",
    "yaşlı bakımı",
    "hasta bakımı",
    "evde doktor",
    "evde doktor İstanbul",
    "evde kan alma",
    "evde tahlil",
    "evde yara bakımı",
    "evde pansuman",
    "hacamat İstanbul",
    "akupunktur İstanbul",
    "sağlık danışmanlığı",
    "geleneksel tıp",
    "evde check-up",
    "7/24 evde sağlık",
  ],
  authors: [{ name: "City in Health" }],
  creator: "City in Health",
  publisher: "City in Health",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.cityinhealth.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.cityinhealth.com",
    siteName: "City in Health",
    title: "City in Health | İstanbul Evde Sağlık Hizmetleri",
    description:
      "İstanbul genelinde 7/24 profesyonel evde sağlık hizmeti. Alanında uzman ekibimizle yanınızdayız.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "City in Health - İstanbul Evde Sağlık Hizmetleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "City in Health | İstanbul Evde Sağlık Hizmetleri",
    description:
      "İstanbul genelinde 7/24 profesyonel evde sağlık hizmeti.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <SchemaMarkup type="MedicalOrganization" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col pb-16 sm:pb-14">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyPhoneBar />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
