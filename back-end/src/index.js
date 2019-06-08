const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();

// Db connection
const { mongoose } = require("./database");

// Settings
app.set("port", process.env.PORT || 8000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
//hablito cors para poder pedir a mi API desde un cliente externo
app.use(cors());

// Routes
app.use("/api/tasks", require("./routes/task.routes"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
