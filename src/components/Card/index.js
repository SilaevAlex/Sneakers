import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorite, title, imageUrl, price, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  /* React.useEffect(() => {
  }, [isAdded]); */

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart_anliked.svg" alt="unliked" onClick={onFavorite} />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price} uah</b>
        </div>

        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "./img/chekedbtn.svg" : "./img/btnplus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}
export default Card;
