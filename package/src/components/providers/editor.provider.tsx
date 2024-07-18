import type { PropsWithChildren } from "react";

import { useEditorController } from "../../controllers";
import { EditorContext, EditorContextType } from "../contexts";

const EditorProvider = ({ editorConfigs, children }: PropsWithChildren<Pick<EditorContextType, "editorConfigs">>) => {
  // Controller
  const { canvasRef } = useEditorController({ editorConfigs });

  return <EditorContext.Provider value={{ canvasRef, editorConfigs }}>{children}</EditorContext.Provider>;
};

export default EditorProvider;
