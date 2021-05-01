import React from "react";
import classNames from "classnames";

import Thumbnail from "./Thumbnail";
import Description from "./Description";

const Card = (props) => {
  return (
    <div className={classNames("flex flex-col w-72 h-max", props.className)}>
      {props.children}
    </div>
  );
};

Card.Thumbnail = Thumbnail;
Card.Description = Description;

export default Card;
