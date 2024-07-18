import type { RefObject } from "react";
import * as React from "react";

export type VideoContextType = { videoRef?: RefObject<HTMLVideoElement> };

export default React.createContext<VideoContextType>({ videoRef: undefined });
