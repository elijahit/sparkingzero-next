// import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "./globals.css";
import siteConfig from "../../siteConfig.json"
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import GoogleAdsense from '../../components/GoogleAdsense';
import Clarity from '../../components/Clarity';
import Iubenda from '../../components/Iubenda';


export const metadata = {
  title: "Sparking Zero Italia",
  description: "Community italiana di Sparking Zero. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei",
  keywords: ['sparking', 'Sparking Zero Italia', 'italia', 'dragonball'],
  openGraph: {
    title: 'Sparking Zero Italia',
    description: 'Community italiana di Sparking Zero. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei',
    url: siteConfig.site.baseUri,
    siteName: 'Sparking Zero Italia - Community',
    images: [
      {
        url: `${siteConfig.site.baseUri}metadata/backgroundOg.jpg`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${siteConfig.site.baseUri}metadata/backgroundOg.jpg`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Background Sparking Zero Italia',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <Clarity/>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-KBS0LV1HXN" />
      <Iubenda />
    </html>
  );
}
