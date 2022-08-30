import React from "react";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";
import Info from "../Info";

const delay = (ms) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplite, setIsOrderComplite] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62e2a50f3891dd9ba8ed329d.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://62e2a50f3891dd9ba8ed329d.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Err");
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            className="removeBtn cu-p"
            src="img/btnRemove.svg"
            alt="remove"
            onClick={onClose}
          />{" "}
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} uah</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btnRemove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} UAH</b>
                </li>
                <li>
                  <span>Налог 9%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 9} UAH</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="img/arrow.svg" alt="arrow" />{" "}
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplite ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplite
                ? `Заказ ${orderId} передан в работу`
                : "Добавьте заказ"
            }
            image={isOrderComplite ? "img/complete.jpg" : "img/emptycart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
