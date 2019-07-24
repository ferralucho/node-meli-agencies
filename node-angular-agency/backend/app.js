const express = require("express");
const bodyParser = require("body-parser");
const agenciesRoutes = require("./routes/agencies");
const sitesRoutes = require("./routes/sites");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, agency, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/agencies", agenciesRoutes);
app.use("/api/sites", sitesRoutes);

module.exports = app;
