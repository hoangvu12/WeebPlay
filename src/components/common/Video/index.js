import React, { useEffect, useState } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

const Video = React.forwardRef((props, ref) => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const currentPlayer = videojs(ref.current, props, () => {
      console.log("ready");
    });

    setPlayer(currentPlayer);

    return () => {
      player && player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={ref} className="video-js vjs-big-play-centered"></video>
    </div>
  );
});

export default Video;
