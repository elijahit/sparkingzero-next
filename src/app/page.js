import styles from "./page.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../components/CardComponents/CardNews"
import { notFound } from "next/navigation";

export default async function Home() {
  const postData = await getData();
  const postDataMobile = await getDataMobile();
  const schemaSite = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://SparkingZero.it",
    "image": '/header-images/logos1.jpg',
    "name": "Sparking Zero Italia",
    "description": "Community italiana di Dragonball: Sparking Zero. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei.",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://SparkingZero.it",
      "name": "Sparking Zero Italia"
    },
    "publisher": {
      '@type': 'Organization',
      'name': 'Sparking Zero Italia',
      'logo': '/header-images/logos1.jpg',
      'keywords': 'sparkingzero, sparkingzeroitalia, sparking, zero, italia, dragonball',
      'founder': [{
        '@type': 'Person',
        'name': 'Gabriele Mario Tosto',
        'description': 'CEO e Developer di Sparking Zero Italia, lavora attualmente come sviluppatore attivo.',
        'jobTitle': 'Software Engineer',
        'givenName': 'Gabriele',
        'email': 'gabriele.tosto@outlook.com'
      }]
    }
  }

  const schemaOrgs = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sparking Zero Italia",
    "url": "https://SparkingZero.it",
    "logo": "/header-images/logos1.jpg",
    "keywords": "sparkingzero, sparkingzeroitalia, sparking, zero, italia, dragonball",
    "founder": [{
      "@type": "Person",
      "name": "Gabriele Mario Tosto",
      "description": "CEO e Developer di Sparking Zero Italia, lavora attualmente come sviluppatore attivo.",
      "jobTitle": "Software Engineer",
      "givenName": "Gabriele",
      "email": "gabriele.tosto@outlook.com"
    }],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@SparkingZero.it"
    },
    "sameAs": [
      "https://x.com/SparkingZero_IT",
      "https://www.tiktok.com/@SparkingZero_it",
      "https://www.instagram.com/SparkingZero_IT/",
      "https://www.facebook.com/SparkingZeroIT/"
    ]
  }

  return (
    <>
      {/* HEADER */}
      <Header isPage="home"></Header>
      <main>
        {/* HERO SECTION */}
        <Hero />
        {/* FIRST SECTION */}
        <section className="mt-5">
          <h1 className="d-none">Sparking Zero Italia</h1>
          <div className="container">
            <div className="row">
              <div className="d-none col-lg-3 d-lg-flex justify-content-end align-items-baseline">
                <Image src={"/home-images/dragonball.webp"} width={184} height={184} className="img-fluid" alt="Soldier avatar"></Image>
              </div>
              <div className="col-12 col-lg-9">
                <p className="text-center text-lg-start mb-5 fs-4">
                  Sparking Zero Italia è la community italiana ufficiale di Sparking Zero, dedicata a tenere tutti i fan e i giocatori aggiornati sulle ultime novità, eventi speciali e competizioni del gioco. Attraverso i nostri canali social e il server Discord, offriamo uno spazio accogliente dove i membri della community possono condividere esperienze, discutere strategie e partecipare a tornei entusiasmanti. Che tu sia un veterano del gioco o un nuovo arrivato, ti invitiamo a unirti a noi per rimanere sempre al passo con le ultime novità e vivere al massimo l’esperienza di Sparking Zero insieme a una community vibrante e appassionata!.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="d-none d-lg-flex container-fluid flex-column align-items-center bg-secondary-custom pt-4 pb-4">
            <h3 className="fs-5 text-center mb-4">LE ULTIME NEWS</h3>
            <div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-5">
              {postData.map((object, i) => <CardNewsHeader key={i} image={object.image_url} title={object.titolo.length > 39 ? object.titolo.slice(0, 39) + "..." : object.titolo} uri={object.uri_article} />)}
            </div>
            <a href="/news" className="btn btn-outline-light">Visualizza tutti i nostri articoli</a>
          </div>
          <div className="container-fluid mb-5 d-flex d-lg-none flex-column align-items-center bg-secondary-custom pt-4 pb-4">
            <h3 className="fs-5 text-center mb-4">LE ULTIME NEWS</h3>
            <div className="flex-column flex-lg-row d-flex gap-5 justify-content-center align-items-center mb-5">
              {postDataMobile.map((object, i) => <CardNewsHeader key={i} image={object.image_url} title={object.titolo.length > 49 ? object.titolo.slice(0, 49) + "..." : object.titolo} uri={object.uri_article} />)}
            </div>
            <a href="/news" className="btn btn-outline-light">Visualizza tutti i nostri articoli</a>
          </div>
        </section>
        <section className="mb-5">
          <div className="d-none d-lg-block">
            <a href="https://discord.gg/2QdfwzkaXD" target="_blank"><Image src={"/home-images/discordbanner.webp"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
          </div>

          <div className="d-block d-lg-none">
            <a href="https://discord.gg/2QdfwzkaXD" target="_blank"><Image src={"/home-images/discordbannerMobile.webp"} alt="Banner discord" className="img-fluid" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}></Image> </a>
          </div>
        </section>

      </main>
      {/* FOOTER */}
      <Footer />
      <script
        id="schema-site"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaSite),
        }}
      />
      <script
        id="schema-orgs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgs),
        }}
      />
    </>
  );
}


async function getData() {
  try {
    const res = await fetch(`http://localhost:4000/api/postNews?limit=3`, { next: { revalidate: 1 } });

    return await res.json();
  } catch {
    notFound();
  }
}

async function getDataMobile() {
  try {
    const res = await fetch(`http://localhost:4000/api/postNews?limit=2`, { next: { revalidate: 1 } });

    return await res.json();
  } catch {
    notFound();
  }
}