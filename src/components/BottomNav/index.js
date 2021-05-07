/* eslint-disable react/jsx-no-target-blank */
import React from "react";

import YouTubeLogo from "../../assets/youtube.png";

const BottomNav = () => {
  return (
    <div className="fixed w-screen h-16 z-10 left-0 bottom-0 bg-secondary flex flex-col items-center justify-center">
      <p className="block text-gray-500 text-lg line-clamp-1">
        Tất cả video thuộc bản quyền của Muse Việt Nam
      </p>

      <a
        href="https://www.youtube.com/channel/UCott96qGP5ADmsB_yNQMvDA"
        target="_blank"
      >
        <div className="flex items-center">
          <img
            src={YouTubeLogo}
            alt="YouTube Logo"
            className="w-6 h-6 block mr-2"
          />
          <p className="text-white text-lg hover:text-orange transition-all duration-300">
            Muse Việt Nam
          </p>
        </div>
      </a>
    </div>
  );
};

export default BottomNav;
