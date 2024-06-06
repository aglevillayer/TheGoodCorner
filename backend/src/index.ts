import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import router from "./routes";
import { dataSource } from "./db/ConfigDB"; // Import de la dataSource
import { cleanDB, initData } from "./db/ConfigDB";

const port = 4000;
const app = express();
app.use(cors());
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
