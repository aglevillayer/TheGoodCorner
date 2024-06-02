import { Request, Response } from "express";
import ads from "../assets/ads";

/*app.get("/", (req, res) => {
  res.send("Hello World!");
});*/

const getAllAds = (req: Request, res: Response) => {
  res.send(ads);
};

const getAdsId = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  res.send("Element dont l'id est " + id + " :" + ads[id]);
  // Pour aller plus loin on peut essayer d'afficher en plus l'objet dont l'id est 2
  //res.send(ads[id - 1]);
};

const postAd = (req: Request, res: Response) => {
  ads.push(req.body);
  res.send("Request received, check the backend terminal");
};

const deleteAd = (req: Request, res: Response) => {
  const adIndex = ads.findIndex((ad) => ad.id === parseInt(req.params.id));
  ads.splice(adIndex, 1);
  res.send("The ad was deleted");
};

const putAd = (req: Request, res: Response) => {
  /*ads = ads.map((ad) => {
    if (ad.id !== req.body.id) {
      return ad;
    } else if (ad.id == req.body.id) {
      return req.body.newAd;ss
    }
  });
  res.send("The ad was updated"); */
};

export { getAllAds, getAdsId, postAd, deleteAd, putAd };
