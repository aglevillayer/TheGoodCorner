import { useRouter } from "next/router";

export default function AdDetailComponent() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <p> Display details of ad {router.query.slug}</p>
      <h1> Title : {router.query.slug}</h1>
    </div>
  );
}
