import HomePage from "./pages/HomePage";
import Playlist from "./pages/Playlist";
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
    navbar: false,
    path: "/playlist",
    component: Playlist,
    exact: false,
  },
  {
    navbar: false,
    path: "/watch",
    component: Watch,
    exact: false,
  },
];

export default defaultRouters;
