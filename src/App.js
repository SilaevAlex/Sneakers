import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState([]);
  const [cartOpened, setCardOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://62e2a50f3891dd9ba8ed329d.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://62e2a50f3891dd9ba8ed329d.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://62e2a50f3891dd9ba8ed329d.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62e2a50f3891dd9ba8ed329d.mockapi.io/cart${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCardOpened(false)} onRemove={onRemoveItem}/>
      )}

      <Header onClickCart={() => setCardOpened(true)} />

      <div className="content p-40 ">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по ${searchValue}` : `Все кроссовки`}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="/img/btnRemove.svg"
                alt="clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log("Add in fav")}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
