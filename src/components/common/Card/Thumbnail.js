import React from "react";

import classNames from "classnames";

const Thumbnail = (props) => {
  return (
    <div className={classNames(props.containerClass)}>
      <img
        src={props.src}
        alt="card-thumbnail"
        className={classNames("rounded-md", props.className)}
      />
    </div>
  );
};

export default Thumbnail;
