import { useContext } from "react";
import { ToolbarContext } from "../contexts";

/**
 * @description this is hook for using in Toolbar Compound Component
 * @returns {context}
 */
export default function useToolbar() {
  const context = useContext(ToolbarContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
