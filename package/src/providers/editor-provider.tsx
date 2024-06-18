import type { PropsWithChildren } from "react";
import { EditorContext, EditorContextType } from "../contexts";
import { use_editor_controller } from "@/controllers";

const EditorProvider = ({ editorConfigs, children }: PropsWithChildren<Pick<EditorContextType, "editorConfigs">>) => {
  const { canvasRef } = use_editor_controller({ editorConfigs });
  return <EditorContext.Provider value={{ canvasRef, editorConfigs }}>{children}</EditorContext.Provider>;
};

export default EditorProvider;
