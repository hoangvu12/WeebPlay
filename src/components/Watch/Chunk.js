import React from "react";
import classNames from "classnames";

const Chunk = ({ minEpisode, maxEpisode, active, ...props }) => {
  return (
    <>
      <div
        className={classNames(
          "w-64 text-center cursor-pointer rounded-sm py-2 font-bold font-roboto",
          active
            ? "outline-orange text-orange"
            : "text-white outline-gray transition-all duration-300 hover:outline-orange hover:text-orange"
        )}
        onClick={() => props.onClick(props.index)}
      >
        Tập {minEpisode.name} - Tập {maxEpisode.name}
      </div>
    </>
  );
};

export default Chunk;
