import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { cors, validate, installer } from "./helpers.js";
import myService from "./services/myService.js";

const port = 8095;
const serviceName = "MyServiceRouter";
const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(validate);

installer(app)(myService);

app.listen(port, function() {
  console.log(`${serviceName} is listening on port ${port}!`);
});
