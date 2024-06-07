import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import AdDetailsComponent from "@/components/AdDetails";
import { AdDetails } from "@/components/AdDetails";

const BACKEND_URL = "http://localhost:4000";

export default function AdDetailsPage() {
  const router = useRouter();
  const id: string = router.query.id;
  console.log("Notre id est :" + id);
  const [ad, setAd] = useState<AdDetails>();

  async function fetchAd(id: string) {
    try {
      const response = await axios.get<AdDetails>(BACKEND_URL + "/ad/" + id);
      const data = response.data as AdDetails;
      setAd(data);
      console.log("response:");
      console.log(data);
      console.log(ad);
    } catch (err) {
      console.error(err, `cannot fetch ad - falling back to empty array`);
    }
  }
  // UseEffect Definition
  useEffect(() => {
    console.log("Page Ad");
    fetchAd(id);
  }, [id]);

  return <>{ad && <AdDetailsComponent {...ad} />}</>;
}
