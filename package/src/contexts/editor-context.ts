import { createContext } from "react";
import { ObjectConfigs } from "../configs";

export type EditorContextType = {
  editorConfigs?: ObjectConfigs;
};

const EditorContext = createContext<EditorContextType>({
  editorConfigs: undefined,
});

export default EditorContext;
