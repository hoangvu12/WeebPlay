import React from "react";
import { Link } from "react-router-dom";
import className from "classnames";

const Item = (props) => {
  return (
    <Link
      to={`/watch?videoId=${props.resourceId.videoId}&playlistId=${props.playlistId}`}
    >
      <div
        className={className(
          "rounded-md border-b-2 border-gray-200 border-opacity-20 px-2 py-3 flex justify-between items-center cursor-pointer mb-2",
          props.active
            ? "bg-white bg-opacity-20"
            : "hover:bg-white hover:bg-opacity-20"
        )}
      >
        <div className="w-6">
          <p className="text-base text-gray-400">{props.position + 1}</p>
        </div>
        <div className="grid grid-cols-7 gap-2 w-11/12">
          <div className="relative overflow-hidden h-full flex items-center col-span-2">
            <img
              alt="item"
              src={props.thumbnails.medium.url}
              width={props.thumbnails.medium.width}
              height={props.thumbnails.medium.height}
              className="object-cover transform hover:opacity-90 hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col self-start col-span-5">
            <p className="text-base text-white font-roboto mb-2 line-clamp-2">
              {props.title}
            </p>
            <p className="text-sm text-gray-400 font-roboto line-clamp-1">
              {props.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
