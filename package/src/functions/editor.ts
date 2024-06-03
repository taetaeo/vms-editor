import { useContext } from "react";
import { EditorContext } from "@/contexts";

export default function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
