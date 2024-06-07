import styles from "../styles/RecentAds.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import AdCard, { AdCardProps } from "./AdCard";

const BACKEND_URL = "http://localhost:4000";
async function fetchAds(): Promise<AdCardProps[]> {
  // TODO : how to handle ad.link prop ?
  try {
    const { data } = await axios.get<AdCardProps[]>(BACKEND_URL + "/ad");
    console.log(data);
    return data.sort((adLeft: AdCardProps, adRight: AdCardProps) =>
      adLeft.createdAt > adRight.createdAt ? -1 : 1
    );
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
  function retirePrice(price: number): void {
    if (totalPrice! > price) {
      setTotalPrice(totalPrice! - price);
    } else {
      setTotalPrice(0);
    }
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <div className={styles.totalPrice}>
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
            <div className={styles.totalPrice}>
              <button className="button" onClick={() => addPrice(ad.price)}>
                Add price to total
              </button>
              <button className="button" onClick={() => retirePrice(ad.price)}>
                Retire price to total
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
