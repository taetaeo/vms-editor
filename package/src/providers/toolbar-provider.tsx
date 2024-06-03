import type { PropsWithChildren } from "react";
import { useToolbarController } from "controllers";
import { ToolbarContext } from "contexts";
import { ToolbarUiConfig, ToolbarSelectedOptionConfigs } from "types";

const ToolbarProvider = ({ uiConfigs, children }: PropsWithChildren<{ uiConfigs: ToolbarUiConfig }>) => {
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
        uiConfigs,
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
