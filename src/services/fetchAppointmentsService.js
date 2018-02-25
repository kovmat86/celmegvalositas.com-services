const data = require('../data/appointments.json');

const Service = {
  urlPattern: "/fetch/appointments",
  type: "get",
  run: (req, res) => {
    const data = req.body;
      .then(() => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

export { Service };
export default Service;
