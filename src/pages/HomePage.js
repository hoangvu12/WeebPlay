import { MenuIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Carousel from "../components/HomePage/Carousel";
import { isEmpty } from "../utils";
import YouTubeAPI from "../utils/youtube";

const yt = new YouTubeAPI();

const channelId = "UCott96qGP5ADmsB_yNQMvDA";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const [sections, setSections] = useState([]);
  const [latestVideos, setLatestVideos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);

  useEffect(() => {
    const getWatchedVideos = async () => {
      const videoIds = Object.keys(localStorage);

      if (isEmpty(videoIds)) return [];

      const videos = await yt.videos(videoIds, {
        filter: ({ snippet }) => snippet.liveBroadcastContent === "none",
        maxResults: 24,
      });

      return videos;
    };

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
      const [sections, latestVideos, watchedVideos] = await Promise.all([
        getSections(),
        getLatestVideos(),
        getWatchedVideos(),
      ]);

      setSections(sections);
      setLatestVideos(latestVideos);
      setWatchedVideos(watchedVideos);

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
            <p className="text-white font-roboto group-hover:text-orange line-clamp-2 break-word transition-all duration-300">
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
        {isLoading && <Carousel.Loader number={3} />}
        {!isLoading && (
          <>
            {!isEmpty(watchedVideos) && (
              <Carousel
                className="mb-5"
                heading="📅 Xem gần đây"
                data={watchedVideos.items}
                renderItem={renderItem}
                itemClass="flex justify-center w-max"
              />
            )}
            <Carousel
              className="mb-5"
              heading="🆕 Đăng tải gần đây"
              data={latestVideos.items}
              renderItem={renderItem}
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

export default HomePage;
