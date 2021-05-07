import React, { useEffect, useState } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-max-quality-selector";
import "videojs-youtube";

import "./video.css";

const Video = React.forwardRef((props, ref) => {
  // const [player, setPlayer] = useState(null);

  useEffect(() => {
    videojs(ref.current, props, () => {
      console.log("ready");
    });

    // setPlayer(currentPlayer);

    // return () => {
    //   player && player.dispose();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.videoId]);

  return (
    <div data-vjs-player>
      <video ref={ref} className="video-js vjs-big-play-centered"></video>
    </div>
  );
});

export default Video;
