import { save } from "./appointmentManager.js";

const Service = {
  urlPattern: "/store/appointments",
  type: "post",
  run: (req, res) => {
    const appointments = req.body;
    console.log("storeAppointments: " + JSON.stringify(appointments));
    save(appointments);
  }
};

export { Service };
export default Service;
