import { auth } from "../plugins/firebase";

const middleware = ({ route, store, redirect }) => {
  auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.email)
      return
    } else if (!user && (route.path == "/SignUp" || route.path == "/SignUp/")) {
      return;
    } else if (!user && !(route.path == "/login" || route.path == "/login/")) {
      return redirect("/login");
    }
  });
};

export default middleware;
