import React from "react";
import styles from "./Card.module.scss";

function Card({ id ,onFavorite, title, imageUrl, price, onPlus, favorited = false}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);



  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

 const onClickFavorite = () => {
  onFavorite({ id ,title, imageUrl, price });
  setIsFavorite(!isFavorite);
 }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? "/img/liked.svg" : "/img/heart_anliked.svg" } alt="unliked"  />
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
