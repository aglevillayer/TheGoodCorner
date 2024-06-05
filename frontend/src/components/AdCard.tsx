import styles from "./AdCard.module.css"; // Qu'il ait pour nom adCard.module.css permet de relier directement le module à adCard

// Interface et pas type ? Pourquoi ?
export type AdCardProps = {
  id: number;
  title: string;
  description?: string;
  owner: string;
  price: number;
  picture?: string;
  location: string;
  createdAt?: Date;
  category?;
  tags?;
  link: string;
};

export default function AdCard({
  id,
  title,
  owner,
  price,
  picture,
  location,
  link,
  category,
}: AdCardProps) {
  return (
    <div className={styles["ad-card-container"]}>
      <div className="ad-card-category">category : {category.name} </div>
      <a className={styles["ad-card-link"]} href={link}>
        <img className={styles["ad-card-image"]} src={picture} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </a>
    </div>
  );
}
