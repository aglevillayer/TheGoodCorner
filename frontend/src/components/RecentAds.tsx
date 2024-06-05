import styles from "./recentAds.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";

const BACKEND_URL = "http://localhost:4000";
async function fetchAds(): Promise<AdCardProps[]> {
  // TODO : how to handle ad.link prop ?
  try {
    const { data } = await axios.get<AdCardProps[]>(BACKEND_URL + "/ad");
    return data;
  } catch (err) {
    console.error(err, `cannot fetch ads - falling back to empty array`);
    return [];
  }
}

export default function RecentAds() {
  // States Definitions
  const [totalPrice, setTotalPrice] = useState<number>();
  const [ads, setAds] = useState<AdCardProps[]>([]);

  async function initAds() {
    const ads: AdCardProps[] = await fetchAds();
    setAds(ads);
  }
  // UseEffect Definition
  useEffect(() => {
    console.log("Initialization of total price to 0€");
    initAds();
    setTotalPrice(0);
  }, []);

  function addPrice(price: number): void {
    setTotalPrice(totalPrice! + price);
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <div className={styles["total-price"]}>
        <div> Total Price : {totalPrice}€</div>
        <button
          onClick={() => {
            setTotalPrice(0);
          }}
        >
          Reset cart
        </button>
      </div>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              owner={ad.owner}
              price={ad.price}
              picture={ad.picture}
              location={ad.location}
              category={ad.category}
              link={ad.link}
            />
            <button className="button" onClick={() => addPrice(ad.price)}>
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
