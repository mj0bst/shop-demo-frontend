import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ShopItemList } from "./component/ShopItemList";
import { Link, Route, Routes } from "react-router-dom";
import { EditShopItem } from "./component/EditShopItem";
import routes from "./routes";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={routes.shopItem.root} className="navbar-brand">
          Webshop Demo
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={routes.shopItem.list} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={routes.shopItem.add} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path={routes.shopItem.root} element={<ShopItemList />} />
          <Route path={routes.shopItem.list} element={<ShopItemList />} />
          <Route path={routes.shopItem.add} element={<EditShopItem />} />
          <Route path={routes.shopItem.edit.template} element={<EditShopItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
