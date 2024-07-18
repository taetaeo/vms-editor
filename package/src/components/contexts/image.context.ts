import { createContext } from "react";

import type { Image } from "../../types";
import { IMAGE_SELECTOR_CONST_KEY } from "../../shared/enums";

type SelectHandlers = { onchangeValue?: (name: IMAGE_SELECTOR_CONST_KEY, value: unknown) => void; onclearValue?: () => void };

export type ImageSelectorContextType = Image & SelectHandlers;

const ImageSelectorContext = createContext<ImageSelectorContextType>({ src: "", alt: "", onchangeValue: undefined, onclearValue: undefined });

export default ImageSelectorContext;
