import { auth } from "@/plugins/firebase";

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(user => {
      //本来は、ここで必要なユーザー情報のオブジェクトを作成して
      //ユーザー情報としてセットする方が好ましいですが、
      //サンプルなので、全てセットしています。
      store.commit("setUser", user);
      resolve();
    });
  });
};
