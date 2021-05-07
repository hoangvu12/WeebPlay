import React from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import className from "classnames";

const Carousel = (props) => {
  const { data, renderItem, heading, headingClass, ...rest } = props;

  return (
    <>
      {heading && (
        <p
          className={className(
            "text-white font-bold text-xl line-clamp-1 mb-5 low:ml-5 lg:ml-0",
            props.headingClass
          )}
        >
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
    </>
  );
};

export default Carousel;
