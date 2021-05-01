import React, { Fragment, useMemo } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { SearchIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

import routes from "../../routes";
import logo from "../../images/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  let location = useLocation();

  const renderRoutes = useMemo(
    () =>
      routes.map((route, i) => {
        const isActive = location.pathname === route.path;
        return (
          <div
            key={i}
            className={classNames(
              "h-14 flex items-center",
              isActive && "border-b-2 border-orange"
            )}
          >
            <Link
              to={route.path}
              className={classNames(
                "px-4 font-roboto hover:text-orange",
                isActive ? "text-white text-lg" : "text-gray-400"
              )}
            >
              {route.navbarTitle}
            </Link>
          </div>
        );
      }),
    [location.pathname]
  );

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <div className={classNames("fixed w-screen h-14 z-10")}>
          <div className="relative w-full h-full flex items-center bg-secondary z-10 top-0">
            <div className="low:hidden lg:absolute lg:flex lg:transform lg:left-1/2 lg:-translate-x-2/4">
              {renderRoutes}
            </div>

            <Center>
              <Disclosure.Button className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </Center>

            <Left>
              <Brand src={logo} />
            </Left>

            <Right>
              <Link to="/search">
                <SearchIcon className="h-5 w-10 text-white hover:text-orange" />
              </Link>
            </Right>

            <Disclosure.Panel static className="relative lg:hidden">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="w-60 h-screen absolute bg-secondary top-7">
                  {renderRoutes}
                </div>
              </Transition>
            </Disclosure.Panel>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

function Center(props) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
      {props.children}
    </div>
  );
}

function Right(props) {
  return <div className="absolute right-5">{props.children}</div>;
}

function Left(props) {
  return (
    <div className="absolute lg:left-5 low:left-1/2 lg:transform-none low:transform low:-translate-x-1/2">
      {props.children}
    </div>
  );
}

function Brand(props) {
  return (
    <Link to="/">
      <img alt="logo" src={props.src} />
    </Link>
  );
}

export default Navbar;
