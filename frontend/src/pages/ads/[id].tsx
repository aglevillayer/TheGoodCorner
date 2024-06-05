import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "@/components/AdCard";

// const BACKEND_URL = "http://localhost:4000";
// async function fetchAd(): Promise<AdCardProps> {
//   try {
//     const { data } = await axios.get<AdCardProps>(BACKEND_URL + "/ad/:id");
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err, `cannot fetch ads - falling back to empty array`);
//   }
// }

export default function AdDetailComponent() {
  //   const router = useRouter();
  //   console.log(router);
  //   const [ad, setAd] = useState<AdCardProps>();

  //   async function initAd() {
  //     const ad: AdCardProps = await fetchAd();
  //     setAd(ad);
  //   }

  // // UseEffect Definition
  // useEffect(() => {
  //   console.log("Page Ad");
  //   initAd();
  // }, []);
  const router = useRouter();
  return (
    <div>
      <p> Display details of ad {router.query.id}</p>
      <h1> Title : {router.query.id}</h1>
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
