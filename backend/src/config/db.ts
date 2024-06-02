import { DataSource } from "typeorm";
import { Ad } from "../components/ad";
import { Tag } from "../components/tag";
import { Category } from "../components/category";

// Initialisation de la datasource
export const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/db/wild.sqlite",
  entities: ["src/components/*.ts"], // On pourrait également renseigner seules les entités que l'on souhaite initialiser : [Student, School, Language]
  synchronize: true, // Passer en false pour de la mise en production
  //logging: "all", // permet d'afficher les requêtes dans les logs
});

// Clean of DBs // On va la mettre dans le listen pour réinitialiser tout à chaque fois pour l'exo
export async function cleanDB() {
  await dataSource.manager.clear(Ad);
  await dataSource.manager.clear(Category);
  await dataSource.manager.clear(Tag);
}

async function createAndPersistAd(
  title: string,
  owner: string,
  price: number,
  category: Category,
  location: string,
  ...tags: Tag[] // ... = "spread syntax" permet de dire que l'on prend tout les paramètres à partir de la 4e position et qu'on les met dans un tableau de Tag qu'on appelera tags
) {
  const ad = new Ad();
  ad.title = title;
  ad.owner = owner;
  ad.price = price;
  ad.category = category;
  ad.location = location;
  ad.tags = tags; // Il nous faut un cascade côté définition de Ad pour pouvoir les ajouter même s'ils ne sont pas déjà sauvegardés dans la table Tag
  ad.createdAt = new Date();

  await dataSource.manager.save(ad);
}

// Initialisation of DBs // On va la mettre dans le listen pour réinitialiser tout à chaque fois pour l'exo
export async function initData() {
  const tagVieuxMatos = new Tag();
  const tagOcarbon = new Tag();
  const tagBonneAffaire = new Tag();
  tagVieuxMatos.name = "vieux matos";
  tagOcarbon.name = "0 carbon";
  tagBonneAffaire.name = "bonne affaire";

  const categoryVetement = new Category();
  categoryVetement.name = "vêtement";
  await dataSource.manager.save(categoryVetement);
  const categoryVoiture = new Category();
  categoryVoiture.name = "voiture";
  await dataSource.manager.save(categoryVoiture);
  const categoryAutre = new Category();
  categoryAutre.name = "autre";
  await dataSource.manager.save(categoryAutre);

  console.log(
    "Tags created, Categories created and saved in the table Category"
  );

  await createAndPersistAd(
    "Ordinateur",
    "Anne-Ga",
    650,
    categoryAutre,
    "Lyon",
    tagVieuxMatos,
    tagBonneAffaire
  );
  console.log("Ad successfully created");
}
