const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { mongoOptions, mongoUri } = require("./config/db");
const {
  notFoundResponse,
  internalServerError,
} = require("./middleware/errors");

function initApp() {
  app.use(express.json({ extended: true }));
  app.use(cookieParser());
  app.use(morgan("combined"));

  // const middleware = (req, res, next) => {
  //   setTimeout(() => {
  //     // passing a new Error object to the next as far as code is async.
  //     next(new Error("Test"));
  //   }, 1000);
  // };

  // app.get("/test", middleware, (req, res) => {
  //   res.send("Hello");
  // });

  app.use(require("./routes/login"));
  app.use(require("./routes/register"));
  app.use(require("./routes/token"));

  app.use(require("./routes/login.google"));

  // a set of protected routes
  app.use("/api", require("./routes/auth.pipe"));

  app.use(notFoundResponse);
  app.use(internalServerError);

  return app;
}

async function establishDbConnection() {
  process.on("SIGINT", async () => {
    // closing all connection in parallel on CTRL-C
    await mongoose.disconnect();
  });

  const db = mongoose.connection;
  db.once("open", () =>
    console.log("Connection was established with the cluster.")
  );
  await mongoose.connect(mongoUri, mongoOptions);
}

module.exports = { initApp, establishDbConnection };
