import * as R from "react";

import type { ButtonGroupColorButtonProps } from "../../ui";
import { ButtonGroupWrapper, ButtonGroupColorButton as ColorButton } from "../../ui";

const ObjectBgColorWidget = Object.assign(ButtonGroupWrapper, {
  BgColor: R.forwardRef<HTMLButtonElement, ButtonGroupColorButtonProps>(
    ({ id = "object_style_background", color = "red", variant = "secondary", optionsClass, style, children, ...rest }, forwardedRef) => (
      <ColorButton
        ref={forwardedRef}
        id={`${id}_${color}`}
        value={color}
        color={color}
        variant="secondary"
        optionsClass={optionsClass}
        style={{ ...style, background: color }}
        {...rest}
      >
        {children}
      </ColorButton>
    )
  ),
  More: R.forwardRef<HTMLButtonElement, ButtonGroupColorButtonProps>(
    ({ id = "", value = "", variant = "secondary", color = "red", optionsClass, style, children = "더보기", ...rest }, forwardedRef) => (
      <ColorButton ref={forwardedRef} id={id} value={value} variant="secondary" color={color} optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </ColorButton>
    )
  ),
});
export default ObjectBgColorWidget;
