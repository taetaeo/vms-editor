import type { RefObject } from "react";
import * as React from "react";

import { ObjectConfigs } from "../../configs";

export type EditorContextType = { canvasRef: RefObject<HTMLCanvasElement> | null; editorConfigs?: ObjectConfigs };

export default React.createContext<EditorContextType>({ canvasRef: null, editorConfigs: undefined });
