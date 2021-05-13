import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import Carousel from "../components/HomePage/Carousel";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { isEmpty } from "../utils";
import YouTubeAPI from "../utils/youtube";

const yt = new YouTubeAPI();

const channelId = "UCott96qGP5ADmsB_yNQMvDA";

function Search() {
  const [isLoading, setIsLoading] = useState(true);

  const [latestVideos, setLatestVideos] = useState([]);

  const useSearchAnime = () => useDebouncedSearch((text) => searchAnime(text));

  const { inputText, setInputText, searchResults } = useSearchAnime();

  const searchAnime = async (keyword) => {
    const videos = await yt.search(channelId, {
      q: keyword,
    });

    return videos;
  };

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
          />

          <Card.Description className="group min-h-14">
            <p className="text-white font-roboto group-hover:text-orange line-clamp-2 break-all transition-all duration-300">
              {anime.title}
            </p>
          </Card.Description>
        </Card>
      </Link>
    ),
    []
  );

  useEffect(() => {
    const getLatestVideos = async () => {
      const videos = await yt.latestVideos(channelId, {
        type: "video",
        maxResults: 24,
        regionCode: "VN",
        filter: ({ snippet }) => snippet.liveBroadcastContent === "none",
      });

      setLatestVideos(videos);
      setIsLoading(false);
    };

    getLatestVideos();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-24 bg-others flex justify-center items-center mb-5">
        <input
          value={inputText}
          type="text"
          placeholder="Tìm kiếm tại đây"
          className="bg-others text-4xl text-center placeholder-gray-500 h-5/6 w-4/6 text-white focus:outline-none"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="w-full bg-primary flex flex-grow justify-center items-center">
        <div className="lg:w-11/12 low:w-full">
          {!isEmpty(searchResults.result) && (
            <Carousel
              className="mb-5"
              heading="Kết quả tìm kiếm"
              data={searchResults.result.items}
              renderItem={renderItem}
              itemClass="flex justify-center w-max"
            />
          )}
          {isLoading && <Carousel.Loader number={2} />}
          {!isLoading && (
            <Carousel
              className="mb-5"
              heading="🆕 Đăng tải gần đây"
              data={latestVideos.items}
              renderItem={renderItem}
              itemClass="flex justify-center w-max"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
