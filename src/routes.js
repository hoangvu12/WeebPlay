import HomePage from "./pages/HomePage";
import Anime from "./pages/Anime";
import Watch from "./pages/Watch";

const defaultRouters = [
  {
    navbarTitle: "Trang chủ",
    navbar: true,
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    navbarTitle: "Anime",
    navbar: true,
    path: "/anime",
    component: Anime,
    exact: false,
  },
  {
    navbar: false,
    path: "/watch/:slug",
    component: Watch,
    exact: false,
  },
];

export default defaultRouters;
