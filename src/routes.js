import HomePage from "./pages/HomePage";
import Anime from "./pages/Anime";

const defaultRouters = [
  {
    navbarTitle: "Trang chủ",
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    navbarTitle: "Anime",
    path: "/anime",
    component: Anime,
    exact: false,
  },
];

export default defaultRouters;
