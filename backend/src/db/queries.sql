-- Supprimer la table si elle existe
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS category;

-- Créer la table de catégories
CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL
);
-- Créer la table d'annonces
CREATE TABLE ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  owner VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  picture VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  category_id INTEGER, 
  FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Insérer 20 annonces dans ces 3 villes : Bordeaux, Paris, Lyon
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id) VALUES
('Pull', 'Vélo en bon état', 'Jean', 100, 'https://www.velo.com/velo.jpg', 'Bordeaux', '2020-09-01 00:00:00',1),
('Voiture', 'Voiture en mauvais état', 'Marie', 2000, 'https://www.voiture.com/voiture.jpg', 'Paris', '2022-09-01 00:00:00',1),
('Ordinateur', 'Ordinateur en bon état', 'Jean', 500, 'https://www.ordinateur.com/ordinateur.jpg', 'Lyon', '2021-01-01 00:00:00',1),
('Playstation', 'Playstation toute neuve', 'Guillaume', 450, 'https://www.playstation.com/playstation.jpg', 'Bordeaux', '2024-01-01 00:00:00',1),
('Short', 'Airpods en bon état', 'Marie', 150, 'https://www.airpods.com/airpods.jpg', 'Paris', '2009-01-01 00:00:00',1),
('Mug', 'Mug en bon état', 'Jean', 5, 'https://www.mug.com/mug.jpg', 'Lyon', '2003-01-01 00:00:00',1),
('Téléphone', 'Téléphone en bon état', 'Jean', 300, 'https://www.telephone.com/telephone.jpg', 'Bordeaux', '2021-01-01 00:00:00',1),
('Chargeur', 'Chargeur en bon état', 'Marie', 10, 'https://www.chargeur.com/chargeur.jpg', 'Paris', '1945-01-01 00:00:00',1),
('Carte', 'Carte en bon état', 'Jean', 1, 'https://www.carte.com/carte.jpg', 'Lyon', '1976-01-01 00:00:00',2),
('Lit', 'Lit en bon état', 'Jean', 200, 'https://www.lit.com/lit.jpg', 'Bordeaux', '1990-01-01 00:00:00',2),
('Radiateur', 'Radiateur en bon état', 'Marie', 50, 'https://www.radiateur.com/radiateur.jpg', 'Paris', '2020-01-01 00:00:00',2),
('Tapis de course', 'Tapis de course en bon état', 'Jean', 100, 'https://www.tapisdecourse.com/tapisdecourse.jpg', 'Lyon', '2000-01-01 00:00:00',2),
('Vélo', 'Vélo en bon état', 'Jean', 100, 'https://www.velo.com/velo.jpg', 'Bordeaux', '2020-01-01 00:00:00',2),
('Voiture', 'Voiture en mauvais état', 'Marie', 2000, 'https://www.voiture.com/voiture.jpg', 'Paris', '2005-01-01 00:00:00',2),
('Ordinateur', 'Ordinateur en bon état', 'Jean', 500, 'https://www.ordinateur.com/ordinateur.jpg', 'Lyon', '2008-01-01 00:00:00',2),
('Playstation', 'Playstation toute neuve', 'Guillaume', 450, 'https://www.playstation.com/playstation.jpg', 'Bordeaux', '2024-01-01 00:00:00',2),
('Airpods', 'Airpods en bon état', 'Marie', 150, 'https://www.airpods.com/airpods.jpg', 'Paris', '2023-01-01 00:00:00',2),
('Mug', 'Mug en bon état', 'Jean', 5, 'https://www.mug.com/mug.jpg', 'Lyon', '2002-01-01 00:00:00',2),
('Pantalon', 'Téléphone en bon état', 'Jean', 300, 'https://www.telephone.com/telephone.jpg', 'Bordeaux', '2021-01-01 00:00:00',3),
('Chargeur', 'Chargeur en bon état', 'Marie', 10, 'https://www.chargeur.com/chargeur.jpg', 'Paris', '1965-01-01 00:00:00',3);

INSERT INTO category (name) VALUES
('vêtement'), ('voiture'), ('autre');