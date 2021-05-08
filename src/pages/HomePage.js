import { MenuIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Carousel from "../components/HomePage/Carousel";
import YouTubeAPI from "../utils/youtube";

const yt = new YouTubeAPI();

const channelId = "UCott96qGP5ADmsB_yNQMvDA";

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

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [sections, setSections] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getLatestVideos = async () => {
      const videos = await yt.latestVideos(channelId, {
        type: "video",
        maxResults: 24,
        regionCode: "VN",
        filter: ({ snippet }) => snippet.liveBroadcastContent === "none",
      });

      return videos;
    };

    const getSections = async () => {
      const sections = await yt.channelSections(channelId, {
        type: "multipleplaylists",
        fetchItems: true,
      });

      return sections;
    };

    const getData = async () => {
      const [sections, videos] = await Promise.all([
        getSections(),
        getLatestVideos(),
      ]);

      setSections(sections);
      setVideos(videos);

      setIsLoading(false);
    };

    getData();
  }, []);

  const renderItem = useCallback(
    (anime, index) => (
      <Link
        to={
          anime.videoId
            ? `/watch?videoId=${anime.videoId}`
            : `/playlist?id=${anime.id}`
        }
        key={index}
      >
        <Card className="cursor-pointer">
          <Card.Thumbnail
            containerClass="relative overflow-hidden"
            src={anime.thumbnails.medium.url || anime.thumbnails.default.url}
            className="object-cover max-h-40 w-full transform hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            {anime.itemCount && (
              <div className="absolute w-2/5 bg-black bg-opacity-75 top-0 right-0 h-full flex flex-col justify-center items-center">
                <div className="text-white font-roboto line-clamp-1 mb-2">
                  {anime.itemCount}
                </div>
                <div className="text-white font-roboto line-clamp-1">
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                </div>
              </div>
            )}
          </Card.Thumbnail>
          <Card.Description className="group min-h-14">
            <p className="text-white font-roboto group-hover:text-orange line-clamp-1 break-all transition-all duration-300">
              {anime.title}
            </p>
          </Card.Description>
        </Card>
      </Link>
    ),
    []
  );

  return (
    <div className="my-2 flex items-center justify-center">
      <div className="lg:w-11/12 low:w-full">
        {isLoading && <Loader number={3} />}
        {!isLoading && (
          <>
            <Carousel
              className="mb-5"
              heading="🆕 Đăng tải gần đây"
              data={videos.items}
              renderItem={renderItem}
              responsive={responsive}
              itemClass="flex justify-center w-max"
            />
            {sections.map((section, index) => {
              return (
                <Carousel
                  key={index}
                  className="mb-5"
                  heading={section.title}
                  data={section.playlists.items}
                  renderItem={renderItem}
                  responsive={responsive}
                  itemClass="flex justify-center w-max"
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

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

export default HomePage;
