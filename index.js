const express = require("express");
const routes = require("./routes");
require("dotenv").config({ path: "./variables.env" });

// db
const db = require("./config/db");
require("./models/Users");
require("./models/Roles");
db.sync()
  .then(() => console.log("DB conected"))
  .catch(err => console.log("DB Error:", err));

// app
const app = express();

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server run in port", port));
