import { useContext } from "react";
import { ImageSelectorContext } from "../../components/contexts";

export default function useImageCtxHandler() {
  const context = useContext(ImageSelectorContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
