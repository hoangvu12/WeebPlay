import React, { useEffect, useMemo, useRef, useState } from "react";
import videojs from "video.js";
import { useParams } from "react-router-dom";
import "videojs-contrib-quality-levels";
import "videojs-max-quality-selector";

import "videojs-max-quality-selector/dist/videojs-max-quality-selector.css";

import { chunkArray, isEmpty } from "../utils";

import Video from "../components/common/Video";
import Chunk from "../components/Watch/Chunk";
import Episode from "../components/Watch/Episode";

import { getAnimeInfo, getEpisodeInfo } from "../utils/api";

const Watch = () => {
  const options = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      controlBar: {
        children: {
          playToggle: {},
          volumePanel: {
            inline: true,
          },
          previousEpisode: {},
          nextEpisode: {},
          ProgressControl: {},
          RemainingTimeDisplay: {},
          fullscreenToggle: {},
        },
      },
      fluid: true,
    }),
    []
  );

  const videoEl = useRef(null);

  const { slug } = useParams();

  const [chunks, setChunks] = useState([]);
  const [info, setInfo] = useState({});
  const [selectedChunk, setSelectedChunk] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  useEffect(() => {
    const player = videojs(videoEl.current);

    player.maxQualitySelector({
      defaultQuality: 2,
    });

    const getVideoUrl = async () => {
      let animeInfo = info;

      if (isEmpty(info) || isEmpty(chunks)) {
        animeInfo = await getAnimeInfo(slug);

        setChunks(chunkArray(animeInfo.episodes, 18));
        setInfo(animeInfo);
      }

      const episode = await getEpisodeInfo(animeInfo.id, selectedEpisode);

      player.src({
        src: episode.videoSource,
        type: "application/x-mpegURL",
      });
    };

    if (!isEmpty(chunks)) {
      chunks.find((chunk, chunkIndex) => {
        const minEpisode = chunk[0];
        const maxEpisode = chunk[chunk.length - 1];

        if (
          selectedEpisode >= minEpisode.index &&
          maxEpisode.index >= selectedEpisode
        ) {
          setSelectedChunk(chunkIndex);
          return true;
        }

        return false;
      });
    }

    getVideoUrl();
  }, [selectedEpisode, slug]);

  return (
    <div className="w-5/6 mx-auto">
      <Video ref={videoEl} {...options} />
      {!isEmpty(chunks) && (
        <>
          <div className="w-full my-3">
            <p className="text-white text-2xl font-bold">Tập phim</p>

            <div className="flex justify-between flex-wrap w-full my-4">
              {chunks.map((chunk, index) => (
                <>
                  <Chunk
                    key={index}
                    index={index}
                    minEpisode={chunk[0]}
                    maxEpisode={chunk[chunk.length - 1]}
                    active={index === selectedChunk}
                    onClick={(index) => setSelectedChunk(index)}
                  />
                </>
              ))}
            </div>

            <div className="flex justify-around gap-1 flex-wrap w-full">
              {chunks[selectedChunk].map((episode, index) => (
                <Episode
                  key={index}
                  index={index}
                  active={episode.index === selectedEpisode}
                  onClick={(index) => setSelectedEpisode(index)}
                  {...episode}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Watch;
