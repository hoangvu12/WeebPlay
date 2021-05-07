import { Transition } from "@headlessui/react";
import { PlayIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../components/Item";

import useQuery from "../hooks/useQuery";
import YouTubeAPI from "../utils/youtube";

const yt = new YouTubeAPI();

const Playlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [playlistItems, setPlaylistItems] = useState([]);

  const query = useQuery();

  const playlistId = query.get("id");

  useEffect(() => {
    const getPlaylistInfo = async () => {
      const info = await yt.playlistById(playlistId);

      return info;
    };

    const getPlaylistItems = async () => {
      const items = await yt.playlistItems(playlistId);

      return items;
    };

    const getData = async () => {
      setIsLoading(true);

      const [info, items] = await Promise.all([
        getPlaylistInfo(),
        getPlaylistItems(),
      ]);

      setPlaylistInfo(info.items[0]);
      setPlaylistItems(items);

      setIsLoading(false);
      setIsShow(true);
    };

    getData();
  }, [playlistId]);

  return (
    <div className="flex flex-col">
      {!isLoading && (
        <Transition
          show={isShow}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="py-5 mb-4 flex justify-center">
            <div className="flex flex-col items-center w-11/12">
              <Link
                to={`/watch?videoId=${playlistItems[0].resourceId.videoId}`}
              >
                <Img
                  src={
                    playlistInfo.thumbnails.high.url ||
                    playlistInfo.thumbnails.default.url
                  }
                />
              </Link>
              <p className="text-white text-2xl">{playlistInfo.title}</p>
              <p className="text-gray-500 text-lg">
                {playlistInfo.itemCount} video
              </p>
            </div>
          </div>
          <div className="py-3 flex flex-col items-center">
            <div className="w-3/6">
              {playlistItems.map((item, index) => {
                return <Item {...item} key={index} />;
              })}
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
};

const Img = (props) => {
  return (
    <div className="relative overflow-hidden cursor-pointer mb-2">
      <img
        alt="Playlist"
        src={props.src}
        className="object-contain transform hover:opacity-90 hover:scale-105 transition-all duration-300"
      />
      <div className="py-2 flex justify-center items-center absolute w-full bottom-0 bg-black opacity-90">
        <PlayIcon className="text-white block h-6 w-6 mr-3 " />
        <p className="text-white text-lg">Xem ngay</p>
      </div>
    </div>
  );
};

export default Playlist;
