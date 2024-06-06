import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";

const BACKEND_URL = "http://localhost:4000";
async function fetchAds(): Promise<AdCardProps[]> {
  try {
    const { data } = await axios.get<AdCardProps[]>(BACKEND_URL + "/category");
    return data;
  } catch (err) {
    console.error(err, `cannot fetch ads - falling back to empty array`);
    return [];
  }
}

export default function CategoryAds() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  async function initAds() {
    const ads: AdCardProps[] = await fetchAds();
    setAds(ads);
  }
  // UseEffect Definition
  useEffect(() => {
    initAds();
  }, []);

  return (
    <>
      <h2>Annonces dans la catégorie </h2>
      <section className="category-ads">
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
          </div>
        ))}
      </section>
    </>
  );
}
