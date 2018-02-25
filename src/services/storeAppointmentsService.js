const data = {};

function storeAvailableSlot({ day, slots }) {
  if (!data.appointments) {
    data.appointments = {};
  }
  data.appointments[day] = slots;
}

function storeAvailableAppointments(appointments) {
  Object.keys(appointments).forEach(day => sroteAvailableSlot({
    day,
    appointments[day],
  }));
}

const Service = {
  urlPattern: "/store/appointments",
  type: "post",
  run: (req, res) => {
    const data = req.body;
    Promise.all([storeAvailableAppointments(data)])
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
