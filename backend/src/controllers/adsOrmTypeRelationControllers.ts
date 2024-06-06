import { Request, Response } from "express";
import { Ad } from "../components/ad";
import { Tag } from "../components/tag";
import { MoreThan, In } from "typeorm";
import { Category } from "../components/category";

/* ---------------- Routes GET ---------------- */
// Afficher toutes les annonces
const getAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(`These are all the ads in the Ad table`);
    const ads: Ad[] = await Ad.find({
      relations: {
        // category: true, // pas nécessaire parce qu'on l'a dans tous les cas mais permet d'avoir catégory avant tags dans notre objet
        tags: true,
      },
    });

    res.status(200).send(ads);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).send("An error occured");
  }
}; // Afficher l'annonce via une requête sur l'id
const getAdsOrmTypeById = async (req: Request, res: Response): Promise<any> => {
  try {
    const requestedId = parseInt(req.params.id);
    console.log(`These are all the ads which id is ${requestedId}`);
    const ad = await Ad.find({
      relations: {
        tags: true,
      },
      where: [{ id: requestedId }],
    });
    console.log(ad);
    res.status(200).send(ad);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).send("An error occured");
  }
};

// Afficher toutes les catégories
const getCategoriesOrmType = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log(`These are all the categories' ads`);
    const categories: Category[] = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).send("An error occured");
  }
};

// Afficher les annonces de la catégorie "autre"
const getAdsOrmTypeByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log(
      `These are all the ads in the category ${req.params.categoryName}`
    );
    const ad = await Ad.find({
      relations: {
        tags: true,
      },
      where: [{ category: { name: req.params.categoryName } }],
    });
    res.status(200).send(ad);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).send("An error occured");
  }
};

// // using query builder
// const averagePrice = await Ad.createQueryBuilder()
//   .select("ROUND(AVG(price), 0)", "averagePrice")
//   .where("location = :location", { location: "Paris" })
//   .getRawOne();

const getAdsAveragePriceOfLocation = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    console.log(`Looking for the ads'average price in ${req.params.location}`);
    let avgPrice = await Ad.createQueryBuilder()
      .select("AVG(price)", "averagePrice")
      .where("location=:location", { location: req.params.location })
      .getRawOne();

    return res.status(200).send(avgPrice);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};

/* ---------------- Routes POST ---------------- */

const postNewAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.body.title || !req.body.price || !req.body.location) {
      res
        .status(400)
        .send("There's missing required information for created the new ad");
    }
    console.log(`We're adding a new ad, save is running.`);
    const ad = new Ad();
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAt = new Date();
    ad.tags = [];

    // Gestion de la catégorie : récupération de l'entité category
    if (req.body.category != null) {
      let category = await Category.find({
        where: { name: req.body.category },
      });
      console.log(category[0]);
      if (category != null) {
        ad.category = category[0];
      }
    }

    await ad.save();

    if (req.body.tags) {
      for (const tagObject of req.body.tags) {
        // Vérifiez si le tag existe déjà
        let tag = await Tag.findOne({ where: { name: tagObject.name } });

        // Si le tag n'existe pas, créez-le
        if (!tag) {
          tag = new Tag();
          tag.name = tagObject.name;
          await tag.save();
        }

        // Ajoutez le tag à l'annonce
        ad.tags.push(tag);
      }
      // Enregistrement de l'annonce avec la mise à jour des tags
      await ad.save();
    }
    console.log(`New ad was saved successfully`);
    // const ads: Ad[] = await Ad.find({
    //   relations: {
    //     // category: true, // pas nécessaire parce qu'on l'a dans tous les cas mais permet d'avoir catégory avant tags dans notre objet
    //     tags: true,
    //   },
    // });
    // res.status(201).send(ads);

    res.status(201).send(ad);
  } catch (err) {
    console.error("Creation of the new ad failed", err);
    res.status(500).send("An error occured");
  }
};

/* ---------------- Routes PUT ---------------- */

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
/*
const updateAddWithOrmIfFirstOfSeptember = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ads = await Ad.find();

    // Filtrer les annonces créées le 1er septembre
    const adsOnSeptember1 = ads.filter((ad) => {
      console.log(ad.createdAt);
      const creationDate = new Date(ad.createdAt);
      return creationDate.getMonth() === 8 && creationDate.getDate() === 1; // Mois est indexé à partir de 0
    });

    // update the ads with new price equal to 0
    adsOnSeptember1.forEach(async (ad) => {
      ad.price = 0;
      await ad.save();
    });

    return res
      .status(200)
      .send(`Ads with creation date = 09-01 have been updated`);
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
};
*/
/* ---------------- Routes DELETE ---------------- */

const deleteAdsOrmType = async (req: Request, res: Response): Promise<any> => {
  const id = parseInt(req.params.id);
  const ad = Ad.findOneBy({ id });
  if (ad !== null) {
    await Ad.delete({ id });
    res.send("The ad was well deleted");
  } else {
    res
      .status(400)
      .send("Error : the ad you're looking to delete doesn't exist");
  }
};

const deleteAdsOrmTypePriceMoreThan40 = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const maxPrice: number = parseInt(req.params.maxPrice);
    const ads = await Ad.delete({
      price: MoreThan(maxPrice),
    });
    console.log(`Ads with a price superior to ${maxPrice}€ were deleted`);
    const newAds: Ad[] = await Ad.find();
    res.status(201).send(newAds);
  } catch (err) {
    console.error("Error : ", err);
    res.status(500).send("An error occured");
  }
};

export {
  getAdsOrmType,
  getAdsOrmTypeById,
  getCategoriesOrmType,
  getAdsOrmTypeByCategory,
  getAdsAveragePriceOfLocation,
  postNewAdsOrmType,
  updateAdsOrmType,
  deleteAdsOrmType,
  deleteAdsOrmTypePriceMoreThan40,
};
