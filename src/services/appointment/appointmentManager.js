const fs = require("fs");
const fileName = "src/data/appointments.json";

function load() {
  const appointments = JSON.parse(fs.readFileSync(fileName));
  return appointments;
}

function save(appointments) {
  fs.writeFile(fileName, JSON.stringify(appointments), "utf8", (err) => {
    if (err) {
      console.log("error generated: " + JSON.stringify(err));
      throw err;
    }
  });
}

function reserveSlot(date, slot) {
  const appointments = load();

  if (!appointments.hasOwnProperty(date)) {
    throw "Appointment date does not exists (" + date + ")";
  }

  if (!appointments[date].hasOwnProperty(slot)) {
    throw "Appointment slot does not exists (date:" + date + ", " + slot + ")";
  }

  if (appointments[date][slot] != "free") {
    throw "Appointment slot is not free (date:" + date + ", " + slot + ", " + appointments[date][slot] + ")";
  }

  appointments[date][slot] = "reserved";
  console.log("Appointment reserved (date:" + date + ", " + slot + ")");

  save(appointments);
}

export { load, save, reserveSlot };
