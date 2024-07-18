import * as React from "react";

import type { ChangeHandler, AnyModelListType, ToolbarSelectedOptionConfigs, ToolbarUiConfig } from "../../types";
import { TOOLBAR_CONST_KEY } from "../../shared/enums";

export type ToolbarContextType = {
  toolbarUiConfig?: ToolbarUiConfig;
  selectedOptions?: ToolbarSelectedOptionConfigs;
  onchangeValue?: (name: TOOLBAR_CONST_KEY, value: unknown) => void;

  isActive?: boolean;
  toggle?: () => void;
  callbackFn?: (objects?: AnyModelListType | null) => void;

  /** 스타일 변경 */
  onchangeObjectBackgroundColor?: ChangeHandler;
  onchangeObjectBorderWidth?: ChangeHandler;
  onchangeObjectFontBold?: ChangeHandler;
  onchangeObjectFontColor?: ChangeHandler;
  onchangeObjectFontSize?: ChangeHandler;
  onchangeObjectFontUnderline?: ChangeHandler;
  onchangeObjectFontAlign?: ChangeHandler;
  onchangeObjectWidth?: ChangeHandler;
  onchangeObjectHeight?: ChangeHandler;
  onchangeObjectCoordX: ChangeHandler;
  onchangeObjectCoordY: ChangeHandler;
};

export default React.createContext<ToolbarContextType>({
  toolbarUiConfig: undefined,
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
  onchangeObjectFontAlign: () => {},
  onchangeObjectWidth: () => {},
  onchangeObjectHeight: () => {},
  onchangeObjectCoordX: () => {},
  onchangeObjectCoordY: () => {},
});
