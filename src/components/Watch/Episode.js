import React from "react";
import classNames from "classnames";

const Episode = (props) => {
  return (
    <div
      className={classNames(
        "cursor-pointer rounded-sm bg-button w-44 text-center py-2 hover:text-orange transition-all duration-300",
        props.active ? "text-orange" : "text-white"
      )}
      onClick={() => props.onClick(props.index)}
    >
      Tập {props.name}
    </div>
  );
};

export default Episode;
