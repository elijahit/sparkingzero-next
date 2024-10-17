import siteConfig from "../../../siteConfig.json"


export const metadata = {
  title: "Sparking Zero Italia - Termini di Servizio",
  description: "Scopri tutto sui termini di servizio adottati da Sparking Zero Italia!",
  openGraph: {
    title: 'Sparking Zero Italia - Termini di Servizio',
    description: 'Scopri tutto sui termini di servizio adottati da Sparking Zero Italia!',
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
      <body>{children}</body>
    </html>
  );
}
