import { Request, Response } from "express";
import db from "../db/configSQLite";

const getAllAdsSql = (req: Request, res: Response) => {
  console.log(`We're looking to show all the ads`);
  const query = `SELECT * FROM ad`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

const getAdsSqlLocation = (req: Request, res: Response) => {
  console.log(
    `We're looking to show all the ads which are in ${req.params.id} `
  );
  const query = `SELECT * FROM ad WHERE location = "${req.params.id}"`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

const deleteAdsSqlPrice = (req: Request, res: Response) => {
  //req.params.id est un string
  console.log(
    `We're looking to delete all the ads which price's < ${req.params.id}€`
  );
  const query = `DELETE FROM ad WHERE price < ${req.params.id}`; // à priori ça fonctionne sans avoir besoin de le passer en integer via parseInt
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res
      .status(200)
      .send(`Ads which price's < ${req.params.id}€ was deleted.`);
  });
};

const putAdsSqlPriceOnDate = (req: Request, res: Response) => {
  console.log(
    `We're looking to update the table "ad" by setting the price to ${req.body.price}€ where the ad was created on "${req.body.createdAt}"`
  );
  const query = `UPDATE ad SET price=${req.body.price} WHERE createdAt="${req.body.createdAt}"`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res
      .status(200)
      .send(
        `Ads which were created on "${req.body.createdAt}" were updated by setting the price to ${req.body.price}€.`
      );
  });
};

const getAdsSqlAvgPriceOnLocation = (req: Request, res: Response) => {
  console.log(
    `We're looking for the average of prices in ${req.params.location}`
  );
  const query = `SELECT AVG(price) as averagePrice FROM ad WHERE location="${req.params.location}"`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

const postNewAdsSql = (req: Request, res: Response) => {
  console.log(`Ad has been well added to the table "ad"`);
  const { title, description, owner, price, picture, location } = req.body;
  const createdAt = new Date().toISOString(); // On aura la date et l'heure au moment de la requête, transformé en format string
  //l'id n'a pas besoin d'être défini puisqu'il est paramétré en autoincrémenté dans la BDD ad
  const query = db.prepare(
    `INSERT INTO ad (title, description, owner, price, picture, location, createdAt) values (?,?,?,?,?,?,?)`
  );

  query.run(
    [title, description, owner, price, picture, location, createdAt],
    (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      return res.status(200).send(`Ad has been well added to the table "ad".`);
    }
  );
};

const getAdsSqlAvgPriceByLocation = (req: Request, res: Response) => {
  console.log(`We're looking for the average of prices in each location`);
  const query = `SELECT location, AVG(price) as averagePrice FROM ad GROUP BY location`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

export {
  getAllAdsSql,
  getAdsSqlLocation,
  deleteAdsSqlPrice,
  putAdsSqlPriceOnDate,
  getAdsSqlAvgPriceOnLocation,
  postNewAdsSql,
  getAdsSqlAvgPriceByLocation,
};
