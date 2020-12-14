import { auth } from "../plugins/firebase";

const middleware = ({ route, store, redirect }) => {
  auth().onAuthStateChanged(user => {
    // if (user) {
    //   console.log("user");
    //   console.log(user);
    // }
    if (
      !user &&
      !(route.path == "/login" || route.path == "/login/")
    ) {
      console.log("!user");
      console.log(route.name !== "login");
      return redirect("/login");
    }
  });
};

export default middleware;
