import styles from "./adCard.module.css"; // Qu'il ait pour nom adCard.module.css permet de relier directement le module à adCard

export type AdCardProps = {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
};

export const AdCard = ({ title, imgUrl, price, link }: AdCardProps) => {
  return (
    <div className={styles["ad-card-container"]}>
      <a className={styles["ad-card-link"]} href={link}>
        <img className={styles["ad-card-image"]} src={imgUrl} />
        <div className={styles["ad-card-text"]}>
          <div className={styles["ad-card-title"]}>{title}</div>
          <div className={styles["ad-card-price"]}>{price} €</div>
        </div>
      </a>
    </div>
  );
};
