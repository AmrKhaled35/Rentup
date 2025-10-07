"use client";

import ReactPlayer from "react-player";

const VideoPlayer = ({ link }) => {
  return (
    <ReactPlayer
      controls
      url={link}
      width={"100%"}
      height={400}
      style={{ borderRadius: "10px" }}
    />
  );
};

export default VideoPlayer;
