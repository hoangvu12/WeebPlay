import { HomeIcon } from "@heroicons/react/solid";

import HomePage from "./pages/HomePage";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import Watch from "./pages/Watch";

const defaultRouters = [
  {
    navbarTitle: "Trang chủ",
    navbar: true,
    path: "/",
    component: HomePage,
    exact: true,
    icon: HomeIcon,
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
  {
    navbar: false,
    path: "/search",
    component: Search,
    exact: false,
  },
];

export default defaultRouters;
