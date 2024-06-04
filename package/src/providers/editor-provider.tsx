import type { PropsWithChildren } from "react";
import { EditorContext, EditorContextType } from "../contexts";

const EditorProvider = ({ editorConfigs, children }: PropsWithChildren<EditorContextType>) => {
  return <EditorContext.Provider value={{ editorConfigs }}>{children}</EditorContext.Provider>;
};

export default EditorProvider;
