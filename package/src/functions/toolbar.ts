import { ToolbarContext } from "contexts";
import { useContext } from "react";

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
