import { NextResponse } from "next/server";
import db from "../../../../scripts/database";
import { cookies } from "next/headers";
import { writeFile } from 'fs';
import sizeOf from "image-size";
import { headers } from "next/headers";


// To handle a POST request to /api
export async function DELETE(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);


  const { id_article, id_request, id_author } = await request.json();

  if (level_admin <= 2 && id_author != id_request) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });

  const checkPresent = await db.all("SELECT * FROM actions_article WHERE id_article = ? AND id_utente = ?", id_article, id_request);
  if (checkPresent.length == 0) {
    await db.run("INSERT INTO actions_article (id_article, id_utente, action) VALUES(?, ?, ?)", id_article, id_request, 0);

    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");

    await db.run("INSERT INTO admin_logs (id_utente, id_article, azione, timestamp, ip) VALUES(?, ?, 5, ?, ?)", id_request, id_article, new Date().getTime(), ip);

    return NextResponse.json({ text: "La richiesta di rimozione dell'articolo è stata inviata, attendi che un responsabile approvi la tua richiesta.", success: 1 }, { status: 200 });
  } else {
    return NextResponse.json({ text: "Una richiesta è attualmente in attesa di essere approvata, non possono essere inserite altre richieste.", success: 0 }, { status: 400 });
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// To handle a POST request to /api
export async function POST(request) {
  const email = cookies().get('email');
  const auth = cookies().get('authToken');
  const randomFileName = getRandomInt(10000, 99999999999);

  const FormData = await request.formData();

  const idPost = FormData.get("idPost");
  const title = FormData.get("title");
  const content = FormData.get("content");
  const requestAuthor = FormData.get("requestAuthor");
  const requestAuthorId = FormData.get("requestAuthorId");
  const authorId = FormData.get("authorId");
  const image = FormData.get("image");

  if (!email && !auth) return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });


  const { level_admin } = await db.get("SELECT * FROM utente WHERE email = ? AND authorization_token = ?", email.value, auth.value);
  if (level_admin < 3) {
    if (authorId != requestAuthorId) {
      return NextResponse.json({ text: "Non hai i permessi necessari per utilizzare questa funzione.", success: 0 }, { status: 400 });
    }
  }


  if (title.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controllo il titolo del tuo post.", success: 0 }, { status: 400 });
  if (content.length == 0) return NextResponse.json({ text: "Abbiamo riscontrato un problema, controlla il contenuto del tuo post.", success: 0 }, { status: 400 });


  //  db.all("UPDATE article SET titolo = ?, testo = ?, image_url = ? WHERE id_article = ?",title, content, `/posts-images/${randomFileName + "_" + idPost}.webp`, idPost);
  const checkPresent = await db.all("SELECT * FROM actions_article WHERE id_article = ? AND id_utente = ?", idPost, requestAuthorId);
  if (checkPresent.length == 0) {
    if (image) {
      const imageFormat = ["image/png", "image/jpeg", "image/webp", "image/jpg"]

      if (imageFormat.find((value) => value == image.type)) {
        const arrbuf = await image.arrayBuffer();
        const buffer = Buffer.from(arrbuf);

        let sizeImage = sizeOf(buffer);
        if (sizeImage.height != 720 || sizeImage.width != 1280) return NextResponse.json({ text: "La dimensione consentita per la tua immagine è 1280 x 720.", success: 0 }, { status: 400 });

        writeFile(`./public/posts-images/${randomFileName + "_" + idPost}.webp`, buffer, function (err) {
          if (err) {
            return console.log(err);
          }
        });
        await db.run("INSERT INTO actions_article (id_article, id_utente, action, titolo, testo, image) VALUES(?, ?, ?, ?, ?, ?)", idPost, requestAuthorId, 1, title, content, `https://postimage.SparkingZero.it/${randomFileName + "_" + idPost}.webp`);
      } else {
        return NextResponse.json({ text: "Il file inserito non è tra i formati consentiti (png, jpg, jpeg, webp)", success: 0 }, { status: 400 });
      }
    } else {
      await db.run("INSERT INTO actions_article (id_article, id_utente, action, titolo, testo) VALUES(?, ?, ?, ?, ?)", idPost, requestAuthorId, 1, title, content);
    }
    const headersList = headers();
    const ip = headersList.get("x-forwarded-for");

    await db.run("INSERT INTO admin_logs (id_utente, id_article, azione, timestamp, ip) VALUES(?, ?, 6, ?, ?)", requestAuthorId, idPost, new Date().getTime(), ip);
    return NextResponse.json({ text: "La tua richiesta di modifica è stata inoltrata con successo, attendi che un responsabile approvi la tua richiesta.", success: 1 }, { status: 200 });
  } else {
    return NextResponse.json({ text: "Sembra che già hai inviato una richiesta, attendi che venga valutata da un responsabile.", success: 0 }, { status: 400 });
  }


}