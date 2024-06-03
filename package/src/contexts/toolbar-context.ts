import { createContext } from "react";
import { TOOLBAR_CONST_KEY } from "enums";
import { ChangeHandler, ObjectList, ToolbarSelectedOptionConfigs, ToolbarUiConfig } from "types";

export type ToolbarContextType = {
  uiConfigs?: ToolbarUiConfig;
  selectedOptions?: ToolbarSelectedOptionConfigs;
  onchangeValue?: (name: TOOLBAR_CONST_KEY, value: unknown) => void;

  isActive?: boolean;
  toggle?: () => void;
  callbackFn?: (objects?: ObjectList | null) => void;

  /** 스타일 변경 */
  onchangeObjectBackgroundColor?: ChangeHandler;
  onchangeObjectBorderWidth?: ChangeHandler;
  onchangeObjectFontBold?: ChangeHandler;
  onchangeObjectFontColor?: ChangeHandler;
  onchangeObjectFontSize?: ChangeHandler;
  onchangeObjectFontUnderline?: ChangeHandler;
  onchangeObjectWidth?: ChangeHandler;
  onchangeObjectHeight?: ChangeHandler;
  onchangeObjectCoordX: ChangeHandler;
  onchangeObjectCoordY: ChangeHandler;
};

const ToolbarContext = createContext<ToolbarContextType>({
  uiConfigs: undefined,
  selectedOptions: undefined,
  onchangeValue: () => {},
  isActive: true,
  toggle: () => {},
  callbackFn: () => {},
  /** 스타일 변경 */
  onchangeObjectBackgroundColor: () => {},
  onchangeObjectBorderWidth: () => {},
  onchangeObjectFontBold: () => {},
  onchangeObjectFontColor: () => {},
  onchangeObjectFontSize: () => {},
  onchangeObjectFontUnderline: () => {},
  onchangeObjectWidth: () => {},
  onchangeObjectHeight: () => {},
  onchangeObjectCoordX: () => {},
  onchangeObjectCoordY: () => {},
});

export default ToolbarContext;
