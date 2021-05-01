import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/common/Card";
import Carousel from "../components/HomePage/Carousel";
import { isEmpty } from "../utils";
import { getAnimeList } from "../utils/api";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 882 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 882, min: 600 },
    items: 2,
    slidesToSlide: 2,
  },
  smallMobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

function HomePage() {
  const [anime, setAnime] = useState({});

  useEffect(() => {
    const getData = async () => {
      const list = await getAnimeList();

      setAnime(list);
    };

    getData();
  }, []);

  const renderItem = useCallback(
    (anime, index) => (
      <Link to={`/watch/${anime.slug}`} key={index}>
        <Card className="cursor-pointer">
          <Card.Thumbnail
            containerClass="overflow-hidden"
            src={anime.thumbnail}
            className="object-cover max-h-40 w-full transform hover:opacity-90 hover:scale-105 transition-all duration-300"
          />
          <Card.Description className="group min-h-14">
            <p className="text-white font-roboto group-hover:text-orange line-clamp-2 break-all transition-all duration-300">
              {anime.title}
            </p>
            <div className="text-gray-400 font-roboto group-hover:text-orange line-clamp-1 transition-all duration-300">
              {anime.episode || anime.time}
            </div>
          </Card.Description>
        </Card>
      </Link>
    ),
    []
  );

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-11/12 low:w-full">
        {!isEmpty(anime) && (
          <>
            <Carousel
              className="mb-5"
              heading="Tập mới nhất"
              data={anime.latest}
              renderItem={renderItem}
              responsive={responsive}
              itemClass="flex justify-center w-max"
              removeArrowOnDeviceType={["tablet", "mobile", "smallMobile"]}
            />

            <Carousel
              heading="Hôm nay xem gì"
              data={anime.recommended}
              renderItem={renderItem}
              responsive={responsive}
              itemClass="flex justify-center w-max"
              removeArrowOnDeviceType={["tablet", "mobile", "smallMobile"]}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
