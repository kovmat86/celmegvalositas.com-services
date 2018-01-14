import { sendEmail } from "../helpers.js";

function renderInfoEmailBody(data) {
  const now = new Date().toString();
  return `<div><p>${data.name} visszahívást kért ${now}-kor</p>
  <p><b>Név: </b>${data.name}</p>
  <p><b>Email: </b><b>${data.email}</p>
  <p><b>Telefon: </b><b>${data.phone}</p>
  <p><b>Visszahívas kért idõpontja: </b>${data.time}</p>
  `;
}

function renderConfirmationEmailBody(data) {
  return `
    <p>Kedves ${data.name}!</p>

    <p>Köszönjük a jelentkezésed! Várhatóan a két munkanapon belül a megadott időpontban keresni fogunk telefonon!</p>

    <p>Választott időpont: ${data.time}</p>

    <p>
      Hogyan kell készülni:
      Kérjük, a szolgáltatásokkal kapcsolatos kérdéseket addig gondold át!
    </p>

    <p>Időpont lemondása, módosítása:</p>
    <p>Kérjük, mihamarabb jelezd nekünk az info@celmegvalositas.com e-mail címen vagy az alábbi telefonszámon, ha nem megfelelő az előjegyzett időpont vagy más időpontra szeretnél átjelentkezni: <b>+36204598526</b></p>
    <p>További kellemes napot kívánunk!<p>
    <p>
      Célmegvalósítás mellébeszélés nélkül<br />
      celmegvalositas.com<br />
      +36 20 459 8526<br />
      <i>1065 Budapest, Révay utca 10. I./104</i><br />
    <p>
  `;
}

function sendConfirmationEmail(data) {
  const html = renderConfirmationEmailBody(data);
  const to = data.email;
  const subject = `Visszaigazolás visszahívás kérésérõl!`;

  return sendEmail(to, subject, html);
}

function sendInfoEmail(data) {
  const html = renderInfoEmailBody(data);
  const to = "info@celmegvalositas.com";
  const subject = `${data.name} visszahívást kér`;

  return sendEmail(to, subject, html);
}

const Service = {
  urlPattern: "/request/phoneback",
  type: "post",
  run: (req, res) => {
    const data = req.body;
    Promise.all([sendInfoEmail(data), sendConfirmationEmail(data)])
      .then(() => {
        res.json({ status: "OK" });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

export { Service };
export default Service;
