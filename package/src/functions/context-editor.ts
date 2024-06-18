import { useContext } from "react";
import { EditorContext } from "../contexts";

export default function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
