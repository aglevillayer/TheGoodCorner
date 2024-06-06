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
  picture: string | undefined,
  location: string,
  ...tags: Tag[] // ... = "spread syntax" permet de dire que l'on prend tout les paramètres à partir de la 4e position et qu'on les met dans un tableau de Tag qu'on appelera tags
) {
  const ad = new Ad();
  ad.title = title;
  ad.owner = owner;
  ad.price = price;
  ad.category = category;
  ad.picture = picture;
  ad.location = location;
  ad.tags = tags; // Il nous faut un cascade côté définition de Ad pour pouvoir les ajouter même s'ils ne sont pas déjà sauvegardés dans la table Tag
  ad.createdAt = new Date();

  await ad.save();
}

// Initialisation of DBs // On va la mettre dans le listen pour réinitialiser tout à chaque fois pour l'exo
export async function initData() {
  const tagVieuxMatos = new Tag();
  const tagOcarbon = new Tag();
  const tagBonneAffaire = new Tag();
  tagVieuxMatos.name = "vieux matos";
  tagOcarbon.name = "0 carbon";
  tagBonneAffaire.name = "bonne affaire";

  const categoryAmeublement = new Category();
  categoryAmeublement.name = "Ameublement";
  await dataSource.manager.save(categoryAmeublement);
  const categoryElectromenager = new Category();
  categoryElectromenager.name = "Électroménager";
  await dataSource.manager.save(categoryElectromenager);
  const categoryPhotographie = new Category();
  categoryPhotographie.name = "Photographie";
  await dataSource.manager.save(categoryPhotographie);
  const categoryInformatique = new Category();
  categoryInformatique.name = "Informatique";
  await dataSource.manager.save(categoryInformatique);
  const categoryTelephonie = new Category();
  categoryTelephonie.name = "Téléphonie";
  await dataSource.manager.save(categoryTelephonie);
  const categoryVelos = new Category();
  categoryVelos.name = "Vélos";
  await dataSource.manager.save(categoryVelos);
  const categoryVehicules = new Category();
  categoryVehicules.name = "Véhicules";
  await dataSource.manager.save(categoryVehicules);
  const categorySport = new Category();
  categorySport.name = "Sport";
  await dataSource.manager.save(categorySport);
  const categoryHabillement = new Category();
  categoryHabillement.name = "Habillement";
  await dataSource.manager.save(categoryHabillement);
  const categoryBebe = new Category();
  categoryBebe.name = "Bébé";
  await dataSource.manager.save(categoryBebe);
  const categoryOutillage = new Category();
  categoryOutillage.name = "Outillage";
  await dataSource.manager.save(categoryOutillage);
  const categoryServices = new Category();
  categoryServices.name = "Services";
  await dataSource.manager.save(categoryServices);
  const categoryVacances = new Category();
  categoryVacances.name = "Vacances";
  await dataSource.manager.save(categoryVacances);

  console.log(
    "Tags created, Categories created and saved in the table Category"
  );

  await createAndPersistAd(
    "Ordinateur",
    "Anne-Ga",
    650,
    categoryInformatique,
    undefined,
    "Lyon",
    tagBonneAffaire
  );
  await createAndPersistAd(
    "Pokemon Bulbizarre",
    "Anne-Ga",
    250,
    categoryBebe,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "Romans",
    tagOcarbon,
    tagBonneAffaire
  );
  await createAndPersistAd(
    "Table",
    "Anne-Ga",
    250,
    categoryAmeublement,
    "/images/table.webp",
    "Lyon",
    tagOcarbon
  );
  await createAndPersistAd(
    "Bougies",
    "Aurélien",
    9,
    categoryAmeublement,
    "/images/bougie.webp",
    "Villeurbanne",
    tagOcarbon
  );
  await createAndPersistAd(
    "Dame Jeanne",
    "Sophie",
    70,
    categoryAmeublement,
    "/images/dame-jeanne.webp",
    "Rennes",
    tagVieuxMatos
  );
  console.log("Ads successfully created");
}
