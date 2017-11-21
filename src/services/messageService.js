import { sendEmail } from "./helpers.js";

function renderEmailBody(data) {
  const now = new Date().toString();
  return `<div><p>${data.name} üzenetet küldött.</p>
  <p><b>Idõpont: </b>${now}</p>
  <p><b>Név: </b>${data.name}</p>
  <p><b>Email: </b><b>${data.email}</p>
  <p><b>Kérdés:</b></p>
  <p>${data.request}</p>
  `;
}

const Service = {
  urlPattern: "/send/message",
  type: "post",
  run: (req, res) => {
    const data = req.body;
    const html = renderEmailBody(data);
    const to = "info@celmegvalositas.com";
    const subject = `${data.name} üzenetet küldött`;

    sendEmail(to, subject, html)
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
