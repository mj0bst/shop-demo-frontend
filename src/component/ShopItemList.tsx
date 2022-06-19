import { FC, useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import ShopItem from "../model/shopItem";
import routes from "../routes";
import * as shopItemService from "../service/shopItemService";
interface IShopItemListProps {}

/**
 * Loads the whole list of shop items via shopItemService and displays them as a table.
 * @param props 
 * @returns ShopItemList component
 */
export const ShopItemList: FC<IShopItemListProps> = (props) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem>();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  const loadItems = () => {
    shopItemService.findAllByName().then((shopItems) => setShopItems((prev) => shopItems.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const selectItem = (item: ShopItem) => {
    setSelectedItem((prev) => item);
  };

  const deleteItem = (id: string) => {
    shopItemService.deleteById(id).then((response) => loadItems());
  };

  return (
    <div className="container">
      <h1>Inventory</h1>
      <div className="row">
        <div className="col-md-8">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th className="fit" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {shopItems.map((shopItem) => (
                <tr
                  className={shopItem.stock === 0 ? "table-danger" : ""}
                  key={shopItem.id}
                  onClick={() => {
                    selectItem(shopItem);
                  }}
                >
                  <td>{shopItem.name}</td>
                  <td>{shopItem.price}</td>
                  <td>{shopItem.stock}</td>
                  <td className="fit">
                    <a
                      className="btn btn-primary me-2"
                      onClickCapture={(event) => event.stopPropagation()}
                      href={routes.shopItem.edit.withId(shopItem.id!)}
                    >
                      <Icon.Pencil />
                    </a>
                    <button className="btn btn-primary" onClickCapture={(event) => deleteItem(shopItem.id!)}>
                      <Icon.Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem ? (
          <div className="col-md-4">
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.description}</p>
          </div>
        ) : (
          <div className="col-md-4"></div>
        )}
      </div>
    </div>
  );
};
