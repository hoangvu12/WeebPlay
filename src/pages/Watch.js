import { Transition } from "@headlessui/react";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Linkify from "react-linkify";
import { useHistory } from "react-router";
import videojs from "video.js";
import "videojs-max-quality-selector/dist/videojs-max-quality-selector.css";

import Video from "../components/common/Video";
import Item from "../components/Item";
import useQuery from "../hooks/useQuery";
import { isEmpty, numberWithCommas } from "../utils";
import YouTubeAPI from "../utils/youtube";

const yt = new YouTubeAPI();

const options = {
  autoplay: true,
  controls: true,
  preload: "auto",
  youtube: {
    customVars: {
      rel: 0,
      iv_load_policy: 3,
      autoplay: 1,
      vq: "hd720",
    },
  },
  controlBar: {
    children: {
      playToggle: {},
      volumePanel: {
        inline: false,
        vertical: true,
      },
      ProgressControl: {},
      RemainingTimeDisplay: {},
      fullscreenToggle: {},
    },
  },
  fluid: true,
  techOrder: ["html5", "youtube"],
};

const Watch = () => {
  const videoEl = useRef(null);

  const query = useQuery();
  const history = useHistory();

  const videoId = query.get("videoId");
  const playlistId = query.get("playlistId");

  // const [videoId] = useState(() => query.get("videoId"));
  // const [playlistId, setPlaylistId] = useState(() => query.get("playlistId"));

  const [isLoading, setIsLoading] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    const getVideoInfo = async () => {
      const videoInfo = await yt.videoInfo(videoId);

      return videoInfo;
    };

    const getPlaylistItems = async () => {
      const items = await yt.playlistItems(playlistId);

      return items;
    };

    const parsePlaylistId = (data) => {
      const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      const regex = new RegExp(expression);

      const urls = data.match(regex);

      // get playlist id
      // https://www.youtube.com/playlist?list=PLdM751AKK4aPckmOpLcVmyMJ-KGQ7_3tW
      return urls
        .find((url) => url.includes("youtube.com/playlist"))
        .split("=")[1];
    };

    const getData = async () => {
      const promises = await Promise.allSettled([
        getVideoInfo(),
        playlistId && getPlaylistItems(),
      ]);

      const [info, items] = promises.map(
        (promise) => promise.status === "fulfilled" && promise.value
      );

      if (!playlistId) {
        const parsedPlaylistId = parsePlaylistId(info.description);

        history.replace(
          `/watch?videoId=${videoId}&playlistId=${parsedPlaylistId}`
        );

        return;
      }

      !isEmpty(info) && setVideoInfo(info);
      !!items && setPlaylistItems(items);

      setIsLoading(false);
      setIsShow(true);
    };

    const player = videojs(videoEl.current);

    // const updateVideoTime = () => {
    //   if (!localStorage[videoId]) return;

    //   const savedInfo = JSON.parse(localStorage[videoId]);

    //   player.currentTime(savedInfo.time);
    // };

    player.maxQualitySelector({
      defaultQuality: 2,
    });

    player.src({
      type: "video/youtube",
      src: `https://www.youtube.com/watch?v=${videoId}`,
    });

    const savedInfo = JSON.parse(localStorage[videoId] || "{}");

    player.currentTime(savedInfo.time);

    player.on("timeupdate", () => {
      const currentPlayTime = player.currentTime();

      localStorage[videoId] = JSON.stringify({ time: currentPlayTime });
    });

    getData();
    // updateVideoTime();

    return () => {
      player && player.off("timeupdate");
    };
  }, [videoId, playlistId]);

  return (
    <div className="w-11/12 mx-auto py-14">
      <div className="lg:w-4/6 mx-auto mb-5 md:w-5/6">
        <Video ref={videoEl} {...options} videoId={videoId} />
      </div>

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
          <div
            className={classNames(
              "grid grid-cols-1 gap-2 mt-2",
              !isEmpty(playlistItems) ? "md:grid-cols-5" : "md:grid-cols-1"
            )}
          >
            <div className="md:col-span-3 mb-5 border-r px-2 md:border-gray-200 md:border-opacity-20">
              <div className="flex justify-between items-center w-full">
                <p className="text-white text-lg font-medium">
                  {videoInfo.title}
                </p>
              </div>
              <div className="flex justify-between items-center text-gray-400 mb-5">
                <div className="flex">
                  <p className="text-base mr-2">
                    {numberWithCommas(videoInfo.statistics.viewCount)} lượt xem
                  </p>
                  <p className="text-base mr-2">•</p>

                  <p className="text-base">
                    {new Date(videoInfo.publishedAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between text-gray-300">
                  <div className="flex mr-4">
                    <ThumbUpIcon className="h-6 w-6 block mr-1" />

                    <p className="text-base">
                      {numberWithCommas(videoInfo.statistics.likeCount)}
                    </p>
                  </div>
                  <div className="flex">
                    <ThumbDownIcon className="h-6 w-6 block mr-1" />
                    <p className="text-base">
                      {numberWithCommas(videoInfo.statistics.dislikeCount)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  className="text-sm text-white"
                >
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a
                        target="blank"
                        href={decoratedHref}
                        key={key}
                        className="line-clamp-1 text-blue-400"
                      >
                        {decoratedText}
                      </a>
                    )}
                  >
                    {videoInfo.description}
                  </Linkify>
                </p>
              </div>
            </div>
            {playlistId && (
              <div className="md:col-span-2 p-2">
                {playlistItems.map((item, index) => (
                  <Item
                    {...item}
                    key={index}
                    active={item.resourceId.videoId === videoId}
                  />
                ))}
              </div>
            )}
          </div>
        </Transition>
      )}
    </div>
  );
};

export default Watch;
