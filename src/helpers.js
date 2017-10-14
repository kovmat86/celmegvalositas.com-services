function cors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}

function validate(err, req, res, next) {
  if (!req.body) res.status(500).send("Something broke!");
}

function installer(app) {
  if (!app) throw new Error("Invalid Express application");

  return function(service) {
    if (!service) throw new Error("Invalid Service API!");
    if (!service.run)
      throw new Error(
        "Invalid Service API! Service must expose a `run` function"
      );
    app[service.type || "get"](service.urlPattern, (req, res) => {
      Promise.resolve()
        .then(() => service.run({ req, res }))
        .then(response => res.json(response || { status: 200 }))
        .catch(err => res.status(500).json(err));
    });
  };
}

export { cors, installer, validate };
export default installer;
