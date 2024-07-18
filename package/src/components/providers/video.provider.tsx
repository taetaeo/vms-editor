import type { PropsWithChildren } from "react";

import { useVideoController } from "../../controllers";
import { VideoContext } from "../contexts";

type Props = {};

const VideoProvider = ({ children }: PropsWithChildren<Props>) => {
  const videoRef = useVideoController();
  return <VideoContext.Provider value={{ videoRef }}>{children}</VideoContext.Provider>;
};

export default VideoProvider;
