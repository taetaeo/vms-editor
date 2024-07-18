import React from "react";

import type { VmsConfigs } from "../configs";
import { useMultiState } from "../shared/hooks";
import { FORM_TOOLBAR_CONST_KEY } from "../shared/enums";

export interface IUseFormToolbarController {
  vmsTheme: VmsConfigs;
  expressTime: number;
  selectedColor: string;
}

interface Props extends VmsConfigs {}

export default function useFormToolbarController<T>(vmsConfigs?: Props) {
  /**
   * ====================== 상태관리 ======================
   */
  const [formToolbarState, dispatchFormToolbarState] = useMultiState<IUseFormToolbarController>({
    vmsTheme: {},
    expressTime: 0,
    selectedColor: "transplant",
  });

  const _setter = (name: FORM_TOOLBAR_CONST_KEY, value: unknown) => dispatchFormToolbarState({ name, value });
  /**
   * ====================== 상태관리 ======================
   */

  const _onchangeBackgroundColor = (value: unknown) => _setter(FORM_TOOLBAR_CONST_KEY.VMS_THEME, value);

  const _onchangeColor = (color: string) => {
    _setter(FORM_TOOLBAR_CONST_KEY.SELECTED_COLOR, color);
  };

  const _onchangeTime = (time: number) => {
    _setter(FORM_TOOLBAR_CONST_KEY.EXPRESS_TIME, time);
  };

  React.useEffect(() => {
    if (!vmsConfigs?.theme) return;

    _onchangeBackgroundColor(vmsConfigs.theme);
  }, [vmsConfigs]);

  return {
    formToolbarState,
    toolbarEventHandler: {
      colorChange: _onchangeColor,
      timeChange: _onchangeTime,
    },
  };
}
