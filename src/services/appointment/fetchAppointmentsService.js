import { load } from "./appointmentManager.js";

const Service = {
  urlPattern: "/fetch/appointments",
  type: "get",
  run: (req, res) => {
    return load();
  }
};

export { Service };
export default Service;
