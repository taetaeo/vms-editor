import * as R from "react";

import type { ButtonGroupButtonProps } from "../../../components/ui";
import { ButtonGroupButton as Button, ButtonGroupWrapper } from "../../../components/ui";

const ObjectAddWidget = Object.assign(ButtonGroupWrapper, {
  Text: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "type", value = "textBox", variant = "primary", optionsClass, style, children = "텍스트 추가", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  Image: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "type", value = "image", variant = "primary", optionsClass, style, children = "이미지 추가", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  Video: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "type", value = "video", variant = "primary", optionsClass, style, children = "비디오 추가", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
});

export default ObjectAddWidget;
