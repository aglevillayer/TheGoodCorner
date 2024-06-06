import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "../../components/AdCard";

const BACKEND_URL = "http://localhost:4000";
async function fetchAds(categoryName: string): Promise<AdCardProps[]> {
  // TODO : how to handle ad.link prop ?
  try {
    const { data } = await axios.get<AdCardProps[]>(
      BACKEND_URL + "/category/" + categoryName
    );
    return data;
  } catch (err) {
    console.error(err, `cannot fetch ads - falling back to empty array`);
    return [];
  }
}

export default function AdsInCategory() {
  const router = useRouter();
  const [ads, setAds] = useState<AdCardProps[]>([]);

  async function initAd() {
    try {
      const adSearch: AdCardProps[] = await fetchAds(router.query.id);
      setAds(adSearch);
    } catch (err) {
      console.error(err, "not such an ad");
    }
  }
  initAd();

  useEffect(() => {}, []);
  return (
    <>
      <section className="category-ads">
        {ads != null ? (
          ads.map((ad) => (
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
          ))
        ) : (
          <p>Pas dannonce</p>
        )}
      </section>
    </>
  );
}
