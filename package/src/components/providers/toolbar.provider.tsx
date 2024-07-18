import type { PropsWithChildren } from "react";

import type { ToolbarUiConfig, ToolbarSelectedOptionConfigs } from "../../types";
import { useToolbarController } from "../../controllers";
import { ToolbarContext } from "../contexts";

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
    onchangeObjectFontSize,
    onchangeObjectFontUnderline,
    onchangeObjectFontAlign,
    onchangeObjectFontColor,
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
        onchangeObjectFontSize,
        onchangeObjectFontUnderline,
        onchangeObjectFontAlign,
        onchangeObjectFontColor,
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
