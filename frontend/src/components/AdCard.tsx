import styles from "./AdCard.module.css"; // Qu'il ait pour nom adCard.module.css permet de relier directement le module à adCard

// Interface et pas type ? Pourquoi ?
export interface AdCardProps {
  id?: number;
  title: string;
  description?: string;
  owner?: string;
  price: number;
  picture?: string;
  location: string;
  createdAt?: Date;
  category?;
  tags?;
  link: string;
}

export default function AdCard({
  id,
  title,
  owner,
  price,
  picture,
  location,
  link = "/ad/" + id,
  category,
}: AdCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.category}>Category : {category.name}</div>
      <a className={styles.link} href={link}>
        <img
          className={styles.image}
          src={picture ?? "/images/file-question.svg"}
        />
        <div className={styles.text}>
          <div className={styles.title}>{title}</div>
          <div className={styles.price}>{price} €</div>
        </div>
      </a>
    </div>
  );
}
