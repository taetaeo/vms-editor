import { useContext } from "react";
import { VideoContext } from "@/contexts";

export default function useVideoContext() {
  const context = useContext(VideoContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
