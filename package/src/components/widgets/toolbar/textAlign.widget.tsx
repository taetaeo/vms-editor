import * as R from "react";
import type { ButtonGroupButtonProps } from "../../ui/";
import { ButtonGroupWrapper, ButtonGroupButton as Button } from "../../ui/";

const TextAlignWidget = Object.assign(ButtonGroupWrapper, {
  Left: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "font_align", value = "left", variant = "primary", optionsClass, style, children = "왼쪽 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  Center: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "font_align", value = "center", variant = "primary", optionsClass, style, children = "가운데 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  Right: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "font_align", value = "right", variant = "primary", optionsClass, style, children = "오른쪽 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
});

export default TextAlignWidget;
