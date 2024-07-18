import type { PropsWithChildren } from "react";

import type { Image } from "../../types";
import { useImageSelectorController } from "../../controllers";
import { ImageSelectorContext, type ImageSelectorContextType } from "../contexts";

type ImageSelectorControllerProps = Image;

const ImageSelectorProvider = ({ children }: PropsWithChildren<ImageSelectorContextType>) => {
  // Controller
  const { imageObject, onchangeValue, onclearValue } = useImageSelectorController<ImageSelectorControllerProps>();

  return <ImageSelectorContext.Provider value={{ ...imageObject, onchangeValue, onclearValue }}>{children}</ImageSelectorContext.Provider>;
};

export default ImageSelectorProvider;
