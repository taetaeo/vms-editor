import { RefObject, createContext } from "react";
import { ObjectConfigs } from "../configs";

export type EditorContextType = {
  canvasRef: RefObject<HTMLCanvasElement> | null;
  editorConfigs?: ObjectConfigs;
};

const EditorContext = createContext<EditorContextType>({
  canvasRef: null,
  editorConfigs: undefined,
});

export default EditorContext;
