import { Request, Response } from "express";
import { Ad } from "../components/ad";
import { MoreThan } from "typeorm";

const getAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  console.log(`These are all the ads in the Ad table`);

  const ads: Ad[] = await Ad.find();

  res.send(ads);
};

const getAdsOrmTypeById = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  console.log(`We're looking for showing the ads which id is ${id}`);
  console.log({ id });
  const ad = await Ad.findOneBy({ id });
  res.send(ad);
};

const deleteAdsOrmTypePriceMoreThan40 = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ads = await Ad.delete({
      price: MoreThan(40),
    });
  } catch (err) {
    console.error("Error : ", err), res.status(500).send("There was an error");
  }
};

const postNewAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  console.log(`We're adding a new ad, save is running.`);
  const ad = new Ad();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = new Date();

  await ad.save();
  console.log(`saved`);
  res.send(ad);
};

const updateAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  console.log(`We're updating the ad which id is ${id}`);
  const ad = await Ad.findOneBy({ id });
  if (ad !== null) {
    // Si on veut ne pas mettre de contrainte { nullable: true } dans la définition de notre table ad,
    // on peut ici encadré chaque définition dans un if (req.body.title != null) par exemple,
    // comme ça, si la caractéristique n'est pas spécifiée dans le body, on ne passe pas dans le if et ne définissons donc modifions pas celle-ci.
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAt = new Date();

    ad.save();
    res.send(ad);
  }
};

const deleteAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  const ad = Ad.findOneBy({ id });
  if (ad !== null) {
    await Ad.delete({ id });
    res.send("The ad was well deleted");
  } else {
    res.send("Error : the ad you're looking to delete doesn't exist");
  }
};

export {
  getAdsOrmType,
  getAdsOrmTypeById,
  postNewAdsOrmType,
  updateAdsOrmType,
  deleteAdsOrmType,
};
