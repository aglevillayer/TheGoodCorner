/*
import express from "express";
import router from "./routes/index";
import db from "./sql/configSql";
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
*/

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import { dataSource } from "./config/db"; // Import de la dataSource
import { cleanDB, initData } from "./config/db";

const port = 5001;
const app = express();
app.use(express.json()); // middleware d'express qui permet de pouvoir lire les corps de requête json
app.use(bodyParser.text({ type: "text/plain" }));

//Utilisation d'un router
app.use("/", router);

// Start server
app.listen(port, async () => {
  await dataSource.initialize();
  console.log("Clean DBs");
  await cleanDB();
  console.log("Initialize DBs");
  await initData();
  console.log(`Server is running on port ${port}`);
});
