import React, { useEffect } from "react";

import videojs from "video.js";

import "videojs-overlay-buttons";
import "videojs-contrib-quality-levels";
import "videojs-max-quality-selector";
import "videojs-youtube";
import "videojs-landscape-fullscreen";

import "videojs-overlay-buttons/dist/videojs-overlay-buttons.css";
import "video.js/dist/video-js.css";
import "./video.css";

const Video = React.forwardRef((props, ref) => {
  // const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = videojs(ref.current, props, () => {
      console.log("ready");
    });

    player.touchOverlay(props.overlayOptions);
    player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true,
      },
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
