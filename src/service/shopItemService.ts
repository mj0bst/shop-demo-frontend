import ShopItem from "../model/shopItem";
import http from "../httpCommon";

function findAllByName(name?: string, exact: boolean = false) {
  return http.get<Array<ShopItem>>("/shopItem", name ? { params: { name, exact } } : {});
}

function findOneById(id: string) {
  return http.get<ShopItem>(`/shopItem/${id}`);
}

function create(data: ShopItem) {
  return http.post<ShopItem>("/shopItem", data);
}

function updateById(data: ShopItem, id: any) {
  return http.put<any>(`/shopItem/${id}`, data);
}

function deleteById(id: any) {
  return http.delete<any>(`/shopItem/${id}`);
}

export { create, findAllByName, findOneById, updateById, deleteById };
