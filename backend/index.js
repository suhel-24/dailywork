const express = require("express");
const dotenv = require("dotenv").config();

const dbconnect = require("./config/bdconfig");
const port = process.env.port;

dbconnect();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/db", require("./routes/dbrouter"));

app.listen(4000, () => {
  console.log(`Server is running on `);
});
