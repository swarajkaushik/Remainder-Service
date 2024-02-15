const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const cron = require("node-cron");
// const sendBasicEmail = require("../src/service/email-service");

const setupAndRunServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}`);

    cron.schedule("*/2 * * * *", () => {
      console.log("running a task every two minutes");
    });

    // sendBasicEmail(
    //   "support@admin.com",
    //   "swarajkaushik@gmail.com",
    //   "This is a testing email",
    //   "Hey, I hope you like the support"
    // );
  });
};

setupAndRunServer();
