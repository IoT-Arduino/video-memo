export default ({ store, route, redirect }) => {
  if (!store.getters.isAuthenticated && route.path !== "/login") {
    redirect("/login");
  }
  if (store.getters.isAuthenticated && route.path === "/login") {
    redirect("/");
  }
};
