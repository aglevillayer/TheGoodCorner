import { AdCardProps } from "./AdCard";
import AdCard from "./AdCard";
import { useState, useEffect } from "react";

export default function RecentAds() {
  const [totalPrice, setTotalPrice] = useState<number>();
  useEffect(() => {
    console.log("Set the total price to 0€");
    setTotalPrice(0);
  }, []);
  const everyRender = () => {
    console.log("This will be executed after every render");
  };

  const ads: AdCardProps[] = [
    {
      imgUrl: "/images/table.webp",
      title: "Table",
      price: 120,
      link: "/ads/table",
    },
    {
      imgUrl: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      price: 75,
      link: "/ads/dame-jeanne",
    },
    {
      imgUrl: "/images/vide-poche.webp",
      title: "Vide-poche",
      price: 4,
      link: "/ads/vide-poche",
    },
    {
      imgUrl: "/images/vaisselier.webp",
      title: "Vaisselier",
      price: 900,
      link: "/ads/vaisselier",
    },
    {
      imgUrl: "/images/bougie.webp",
      title: "Bougie",
      price: 8,
      link: "/ads/bougie",
    },
    {
      imgUrl: "/images/porte-magazine.webp",
      title: "Porte-magazine",
      price: 45,
      link: "/ads/porte-magazine",
    },
  ];
  return (
    <>
      <h2>Annonces récentes</h2>
      <p> Prix total : {totalPrice}€</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.title}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={ad.link}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotalPrice(totalPrice + ad.price);
              }}
            >
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
