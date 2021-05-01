import React from "react";

import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carousel = (props) => {
  const { data, renderItem, heading, ...rest } = props;

  return (
    <div>
      {heading && (
        <p className="text-white font-bold text-2xl mb-5 low:ml-5 lg:ml-0 ">
          {heading}
        </p>
      )}
      <MultiCarousel
        swipeable={true}
        draggable={true}
        infinite={false}
        keyBoardControl={true}
        transitionDuration={500}
        {...rest}
      >
        {props.data.map((item, index) => props.renderItem(item, index))}
      </MultiCarousel>
    </div>
  );
};

export default Carousel;
