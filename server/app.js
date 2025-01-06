const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/user"));
app.use("/api/employees", require("./routes/employees"));

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server has been started on port:${PORT}...`);
});