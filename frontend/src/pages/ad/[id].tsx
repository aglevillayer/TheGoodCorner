import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "@/components/AdCard";

const BACKEND_URL = "http://localhost:4000";
async function fetchAd(id: string): Promise<AdCardProps> {
  try {
    const { data } = await axios.get<AdCardProps>(BACKEND_URL + "/ad/:" + id);
    return data;
  } catch (err) {
    console.error(err, `cannot fetch ad - falling back to empty array`);
  }
}

export default function AdDetailComponent() {
  const router = useRouter();
  const [ad, setAd] = useState<AdCardProps>();

  async function initAd() {
    try {
      const id: string = router.query.id;
      const adSearch: AdCardProps = await fetchAd(id);
      setAd(adSearch);
    } catch (err) {
      console.error(err, "not such an ad");
    }
  }

  // UseEffect Definition
  useEffect(() => {
    console.log("Page Ad");
    initAd();
  }, []);

  return (
    <div>
      <p> Display details of ad {router.query.id}</p>
      <h1> Title : {ad.title}</h1>
      {/* <AdCard
        id={ad.id}
        title={ad.title}
        owner={ad.owner}
        price={ad.price}
        picture={ad.picture}
        location={ad.location}
        category={ad.category}
        link={ad.link}
      /> */}
    </div>
  );
}
