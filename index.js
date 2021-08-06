const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movie"));

app.listen(process.env.PORT, () => {
  console.log(`Server running port ${process.env.PORT}`);
});
