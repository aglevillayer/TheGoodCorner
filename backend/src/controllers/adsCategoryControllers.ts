import { Request, Response } from "express";
import db from "../db/configSQLite";

//Afficher les annonces de la catégorie “vêtement” (=2)
const getAdsByCategoryName = (req: Request, res: Response) => {
  console.log(
    `We're looking to show all the ads in the category ${req.params.categoryName}`
  );

  // const queryBis = `SELECT * FROM ad WHERE category_id=${req.params.id}`; //Si on considère qu'on prend en paramètre l'id de la catégorie (à changer dans la route), mais si on veut plutôt ciblé le nom de la catégorie on va utiliser une jointure : voir query
  const query = `SELECT a.* FROM ad a
                    join category c
                        on a.category_id=c.id
                    where c.name="${req.params.categoryName}";`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

//Afficher les annonces des catégories “vêtement” et “voiture”
// A travailler, ne fonctionne pas !!
const getAdsCategoryIds = (req: Request, res: Response) => {
  const categoriesNames = req.body.categoriesNames as string[] | undefined;
  if (!categoriesNames || categoriesNames.length == 0) {
    return res.status(400).send("no category entered");
  }
  console.log(categoriesNames);
  console.log(
    `We're looking to show all the ads in the categories ${categoriesNames
      .map((name) => `'${name}'`)
      .join(" and ")}`
  );
  const query = `SELECT a.* FROM ad a
                    join category c on a.category_id=c.id
                    WHERE c.name IN (${categoriesNames
                      .map((name) => `'${name}'`)
                      .join(",")})`;
  const query2 = `START TRANSACTION
                    SELECT * FROM ad WHERE category_id=${req.body.category1};
                    SELECT * FROM ad WHERE category_id=${req.body.category2}
                COMMIT`;
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
};

// Afficher le prix moyen des annonces de la catégorie “autre”
const getAvgPriceForCategory = (req: Request, res: Response) => {
  const query = `SELECT c.name as "categoryName", AVG(price) as "averagePrice" FROM ad a
                            JOIN category c ON a.category_id=c.id
                            WHERE c.name="${req.params.categoryName}"`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error : " + err);
      return res.status(500).send(err.message);
    } else {
      return res.status(200).send(rows);
    }
  });
};

//Afficher les annonces des catégories dont le nom commence par un “v”
const getAdsCategoryByLetter = (req: Request, res: Response) => {
  console.log(
    `We're looking for ads which category's name begun with ${req.params.letter}.`
  );
  const sql = `SELECT a.* FROM ad a
                    JOIN category c ON a.category_id=c.id
                    WHERE c.name LIKE "${req.params.letter}%"`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error : " + err);
      return res.status(500).send(err.message);
    } else {
      return res.status(200).send(rows);
    }
  });
};

// Créer un endpoint qui permet d’ajouter une annonce et de créer sa catégorie à la volée, tout cela dans une transaction
const postNewAdAndCreateCategory = (req: Request, res: Response) => {
  console.log(
    `We want to add a new ad and create its category if it doesn't exist`
  );

  const { title, description, owner, price, picture, location, categoryName } =
    req.body;
  const createdAt = new Date().toISOString();
  const sql = `BEGIN TRAN1;
                    UPDATE ad SET (title, description, ower, price, picture, location, createdAt) VALUES (${title}, ${description}, ${owner}, ${price}, ${picture}, ${location}, ${createdAt});
                    POST....;
                
                COMMIT TRAN1;`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(`There's an error : ` + err);
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Congrats, your new ad has been created`);
    }
  });
};

export {
  getAdsByCategoryName,
  getAdsCategoryIds,
  getAvgPriceForCategory,
  getAdsCategoryByLetter,
  postNewAdAndCreateCategory,
};
