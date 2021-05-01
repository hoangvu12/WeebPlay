import React from "react";

import classNames from "classnames";

const Description = (props) => {
  return (
    <div className={classNames(props.className, "mt-2")}>{props.children}</div>
  );
};

export default Description;
