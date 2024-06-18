import { useContext } from "react";
import { ImageSelectorContext } from "../contexts";

export default function useImageSelectorContext() {
  const context = useContext(ImageSelectorContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
