import express from "express";
import router from "./routes/index";
import db from "./db/configSQLite";
import fs from "fs";
import path from "path";

const port = 3000;
const app = express();
app.use(express.json()); // middleware d'express qui permet de pouvoir lire les corps de requête json

const queries = fs.readFileSync(
  path.join(__dirname, "./sql/queries.sql"),
  "utf8"
);

db.exec(queries, (err) => {
  if (err) {
    console.error("Error executing the SQL script:", err.message);
  } else {
    console.log("Database initialized successfully.");
  }
});

//Utilisation d'un router
app.use("/", router);
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
