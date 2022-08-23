import React from "react";
import Card from "../components/Card";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://62e2a50f3891dd9ba8ed329d.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        console.log("Err loading orders...");
      }
    })();
  }, []);
  return (
    <div className="content p-40 ">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
