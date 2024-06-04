import type { PropsWithChildren } from "react";
import { useToolbarController } from "../controllers";
import { ToolbarContext } from "../contexts";
import { ToolbarUiConfig, ToolbarSelectedOptionConfigs } from "../types";

const ToolbarProvider = ({ toolbarUiConfig, children }: PropsWithChildren<{ toolbarUiConfig: ToolbarUiConfig }>) => {
  const {
    isActive,
    toggle,
    selectedOptions,
    onchangeValue,
    callbackFn,

    onchangeObjectBackgroundColor,
    onchangeObjectBorderWidth,
    onchangeObjectFontBold,
    onchangeObjectFontColor,
    onchangeObjectFontSize,
    onchangeObjectFontUnderline,
    onchangeObjectWidth,
    onchangeObjectHeight,
    onchangeObjectCoordX,
    onchangeObjectCoordY,
  } = useToolbarController<ToolbarSelectedOptionConfigs>();
  return (
    <ToolbarContext.Provider
      value={{
        toolbarUiConfig,
        isActive,
        toggle,
        selectedOptions,
        onchangeValue,
        callbackFn,
        onchangeObjectBackgroundColor,
        onchangeObjectBorderWidth,
        onchangeObjectFontBold,
        onchangeObjectFontColor,
        onchangeObjectFontSize,
        onchangeObjectFontUnderline,
        onchangeObjectWidth,
        onchangeObjectHeight,
        onchangeObjectCoordX,
        onchangeObjectCoordY,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export default ToolbarProvider;
