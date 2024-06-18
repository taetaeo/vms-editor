import { type RefObject, createContext } from "react";

export type VideoContextType = {
  videoRef?: RefObject<HTMLVideoElement>;
};

const VideoContext = createContext<VideoContextType>({
  videoRef: undefined,
});

export default VideoContext;
