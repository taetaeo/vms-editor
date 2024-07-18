import { useContext } from "react";

import { EditorContext } from "../../components/contexts";

export default function useEditorCtxHandler() {
  const context = useContext(EditorContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
