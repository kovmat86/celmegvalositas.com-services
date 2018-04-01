import { sendEmail } from "../../helpers.js";
import { reserveSlot } from "./appointmentManager.js";
import moment from "moment";

function renderInfoEmailBody(data) {
  const now = new Date().toString();
  return `<div><p>Időpont foglalás:</p>
  <p><b>Név: </b>${data.name}</p>
  <p><b>Email: </b><b>${data.email}</p>
  <p><b>Telefon: </b><b>${data.phone}</p>
  <p><b>Időpont: </b><b>${data.date} ${data.slot}</p>
  `;
}

function renderConfirmationEmailBody(data) {
  const formattedDate = moment(data.date).format("YYYY. MM. DD.");
  return `
    <p>Kedves ${data.name}!</p>

    <p>Köszönjük a jelentkezésed!</p>

    <p>Választott időpont: ${formattedDate} ${data.slot}</p>

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
  const subject = `Visszaigazolás időpont foglalásról`;

  return sendEmail(to, subject, html);
}

function sendInfoEmail(data) {
  const html = renderInfoEmailBody(data);
  const to = "info@celmegvalositas.com";
  const subject = `${data.name} időpontot foglalt`;

  return sendEmail(to, subject, html);
}

const Service = {
  urlPattern: "/request/appointment",
  type: "post",
  run: (req, res) => {
    const data = req.body;
    console.log('request/appointment called');
    console.log(data);
    reserveSlot(data.date, data.slot);
    sendInfoEmail(data),
    sendConfirmationEmail(data)
    // console.log(renderConfirmationEmailBody(data));
  }
};

export { Service };
export default Service;
