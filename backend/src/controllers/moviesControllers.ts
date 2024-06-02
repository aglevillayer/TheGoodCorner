import { Request, Response } from "express";
import fs from "node:fs";

// On charge le movies.csv
const csvContent: string = fs.readFileSync(
  "/Users/levil/Documents/Cours/Wild Code School/Cours/theGoodCorner/backend/src/assets/movies.csv",
  {
    encoding: "utf-8",
  }
);
const lines: string[] = csvContent.split(/\n/);
const movies: string[] = lines.slice(1); // On enlève la première ligne de notre tableau (ID, Titre, Année(s), Prix, Horaires)

const getAllMovies = (req: Request, res: Response) => {};

const getMoviesCount = (req: Request, res: Response) => {
  res.send(
    "There are " +
      movies.length +
      " films to watch, discover and enjoy in this file."
  );
};

const getMoviesTotalBudget = (req: Request, res: Response) => {
  let totalBudget: number = 0;
  movies.forEach((movie) => {
    const [id, title, year, price, hour]: string[] = movie.split(/;/);
    //console.log(movieTable);
    totalBudget += parseInt(price);
  });
  res.send("You'll need " + totalBudget + "€ to buy all these films.");
};

/*
const getMoviesMinYear=(req:Request, res:Response)=>>{
    const result = [];
    movies.forEach((movie) => {
      const [id, title, year, price, hour]: string[] = movie.split(";");
      console.log(parseInt(hour));
      if (req.query.minYear !== null && typeof req.query.minYear == "string") {
        if (parseInt(year) > parseInt(req.query.minYear)) {
          result.push({ title: title, year: year });
        }
      }
      if (
        req.query.requestedTime !== null &&
        req.query.requestedTime == "string"
      ) {
        if (parseInt(req.query.requestedTime) == parseInt(hour)) {
          result.push({ title: title, hour: hour });
        }
      }
    });
    res.send(result);
}
*/

export { getAllMovies, getMoviesCount, getMoviesTotalBudget };
