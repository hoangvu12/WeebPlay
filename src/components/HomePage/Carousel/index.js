import React from "react";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import className from "classnames";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1260 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1260, min: 882 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 882, min: 583 },
    items: 2,
    slidesToSlide: 2,
  },
  smallMobile: {
    breakpoint: { max: 583, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

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
        responsive={responsive}
        {...rest}
      >
        {props.data.map((item, index) => props.renderItem(item, index))}
      </MultiCarousel>
    </>
  );
};

function Loader({ number = 1 }) {
  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div className="mb-5 p-4 w-full mx-auto" key={index}>
          <div className="animate-pulse w-full">
            <div className="h-4 bg-gray-400 rounded w-2/4 mb-5"></div>
            <div className="w-full flex items-center justify-center">
              <div className="h-40 bg-gray-400 rounded w-72 mr-2"></div>
              <div className="h-40 bg-gray-400 rounded w-72 mr-2 low:hidden sm:block lg:block"></div>
              <div className="h-40 bg-gray-400 rounded w-72 mr-2 low:hidden md:block lg:block"></div>
              <div className="h-40 bg-gray-400 rounded w-72 mr-2 low:hidden md:hidden lg:block"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

Carousel.Loader = Loader;

export default Carousel;
