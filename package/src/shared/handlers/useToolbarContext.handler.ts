import { useContext } from "react";
import { ToolbarContext } from "../../components/contexts";

export default function useToolbarCtxHandler() {
  const context = useContext(ToolbarContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
