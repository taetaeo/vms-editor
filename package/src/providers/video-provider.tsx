import type { PropsWithChildren } from "react";
//
import { useCanvasContext } from "../functions";
import { VideoContext } from "../contexts";
import { use_video_controller } from "../controllers";

type Props = {
  // canvas: CanvasModel<ObjectConfigsTextBoxObject, ObjectConfigsImageObject, ObjectConfigsVideoObject>;
};

const VideoProvider = ({ children }: PropsWithChildren<Props>) => {
  const { canvas } = useCanvasContext();
  const videoRef = use_video_controller(canvas!);
  return <VideoContext.Provider value={{ videoRef }}>{children}</VideoContext.Provider>;
};

export default VideoProvider;
