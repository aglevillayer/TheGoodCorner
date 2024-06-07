import styles from "../styles/AdDetails.module.css";
import AdCard, { AdCardProps } from "@/components/AdCard";

export interface AdDetails {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: Date;
  category;
  tags;
}

export default function AdDetailsComponent({
  id,
  title,
  description,
  owner,
  price,
  picture,
  location,
  createdAt,
  category,
  tags,
}: AdDetails) {
  return (
    <div className="AdDetailsComponent">
      <div className={styles.AdDetailsTitle}>
        <h1>{title}</h1>
        <h1>{price}€</h1>
      </div>
      <img
        className={styles.AdDetailsPicture}
        src={picture ?? "/images/file-question.svg"}
      />
      <p>{description}</p>
      <div>
        <p>{owner ?? "Everybody"}</p>
        <p>{location}</p>
      </div>
    </div>
  );
}
