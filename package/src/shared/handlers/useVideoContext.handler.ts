import { useContext } from "react";
import { VideoContext } from "../../components/contexts";

export default function useVideoCtxHandler() {
  const context = useContext(VideoContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
