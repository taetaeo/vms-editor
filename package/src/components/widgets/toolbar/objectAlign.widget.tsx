import * as R from "react";

import type { ButtonGroupButtonProps } from "../../ui/";
import { ButtonGroupWrapper, ButtonGroupButton as Button } from "../../ui/";

const ObjectAlignWidget = Object.assign(ButtonGroupWrapper, {
  HorizonLeft: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_horizon_left", value = "left", variant = "primary", optionsClass, style, children = "수평 왼쪽 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  HorizonRight: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_horizon_right", value = "right", variant = "primary", optionsClass, style, children = "수평 오른쪽 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  HorizonCenter: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_horizon_center", value = "center", variant = "primary", optionsClass, style, children = "수평 가운데 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  VerticalTop: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_vertical_top", value = "top", variant = "primary", optionsClass, style, children = "수직 위 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  VerticalBottom: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_vertical_bottom", value = "bottom", variant = "primary", optionsClass, style, children = "수직 아래 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  VerticalCenter: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "object_vertical_center", value = "center", variant = "primary", optionsClass, style, children = "수직 가운데 정렬", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
});

export default ObjectAlignWidget;
