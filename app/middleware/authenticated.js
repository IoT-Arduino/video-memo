export default ({ store, route, redirect }) => {
  console.log("route-path", route.path);

  let isLoginPage = false;
  const currentPath = route.path;
  if (currentPath.match(/login/)) {
    isLoginPage = true
  } else {
    isLoginPage = false
  }

  if (!store.getters.isAuthenticated && !isLoginPage) {
    redirect("/login");
    console.log(store.getters.isAuthenticated);
  }
  // if (store.getters.isAuthenticated && isLoginPage) {
  //   redirect("/");
  //   console.log(store.getters.isAuthenticated);
  // }
};
