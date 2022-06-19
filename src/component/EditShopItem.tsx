import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import ShopItem from "../model/shopItem";
import * as shopItemService from "../service/shopItemService";
import routes from "../routes";

interface IEditShopItemProps {}

/**
 * Component for editing a shop item. If an id is specified using the router param "id",
 * loads the respective shop item via the shopItemService and enables the user to edit it, else
 * allows for adding a new shop item.
 * @param props
 * @returns EditShopItem component
 */
export const EditShopItem: FC<IEditShopItemProps> = (props) => {
  const params = useParams();
  const id = params.id;
  const isNew = id === undefined;

  const [shopItem, setShopItem] = useState<ShopItem>({ name: "", description: "", price: 0.0, stock: 0 });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isNew) {
      shopItemService
        .findOneById(id)
        .then((response) => setShopItem((prev) => response.data))
        .catch((error) => navigate(routes.shopItem.list));
    }
  }, [id, isNew, navigate]);

  const inputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    elementChanged(event.target.id, event.target.value);
  };

  const textareaChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    elementChanged(event.target.id, event.target.value);
  };

  const elementChanged = (id: string, value: any) => {
    setShopItem((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const addItem = () => {
    shopItemService
      .create(shopItem)
      .then((response) => navigate(routes.shopItem.list))
      .catch((error) => setError((prev) => error.message));
  };

  const editItem = () => {
    shopItemService
      .updateById(shopItem, id)
      .then((response) => navigate(routes.shopItem.list))
      .catch((error) => setError((prev) => error.message));
  };

  return (
    <div className="container">
      <h1>{isNew ? "Add Item" : `Edit Item "${shopItem.name}"`}</h1>

      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">
          Name
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={inputChanged}
            value={shopItem.name}
          ></input>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Description
          <textarea
            className="form-control"
            id="description"
            placeholder="Description"
            cols={50}
            rows={5}
            onChange={textareaChanged}
            value={shopItem.description}
          ></textarea>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Price
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="0.00"
            min="0"
            step=".01"
            onChange={inputChanged}
            value={shopItem.price}
          ></input>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Stock
          <input
            type="number"
            className="form-control"
            id="stock"
            placeholder="0"
            min="0"
            step="1"
            onChange={inputChanged}
            value={shopItem.stock}
          ></input>
        </label>
      </div>
      <div className="mb-3">
        {isNew ? (
          <button className="btn btn-primary" onClick={addItem}>
            <Icon.PlusLg size={16} /> Add
          </button>
        ) : (
          <button className="btn btn-primary" onClick={editItem}>
            <Icon.Save size={16} /> Save
          </button>
        )}
      </div>
    </div>
  );
};
