import type { PropsWithChildren } from "react";
import { ImageSelectorContext, type ImageSelectorContextType } from "@/contexts";
import { use_imageSelector_controller } from "@/controllers";

type ImageSelectorControllerProps = {
  src?: string;
  alt?: string;
};

const ImageSelectorProvider = ({ children }: PropsWithChildren<ImageSelectorContextType>) => {
  const { imageObject, onchangeValue, onclearValue } = use_imageSelector_controller<ImageSelectorControllerProps>();

  return (
    <ImageSelectorContext.Provider
      value={{
        ...imageObject,
        onchangeValue,
        onclearValue,
      }}
    >
      {children}
    </ImageSelectorContext.Provider>
  );
};

export default ImageSelectorProvider;
