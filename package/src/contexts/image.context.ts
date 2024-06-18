import { createContext } from "react";
import { IMAGE_SELECTOR_CONST_KEY } from "@/enums";

export type ImageSelectorContextType = {
  src?: string;
  alt?: string;

  onchangeValue?: (name: IMAGE_SELECTOR_CONST_KEY, value: unknown) => void;
  onclearValue?: () => void;
};

const ImageSelectorContext = createContext<ImageSelectorContextType>({
  src: "",
  alt: "",
  onchangeValue: undefined,
  onclearValue: undefined,
});

export default ImageSelectorContext;
