const routes = {
  shopItem: {
    root: "/",
    list: "/shopItem",
    add: "/shopItem/add",
    edit: {
      template: "/shopItem/id/:id",
      withId: (id: string) => `/shopItem/id/${id}`,
    },
  },
};

export default routes;
