import * as R from "react";

import type { ButtonGroupButtonProps } from "../../ui/";
import { ButtonGroupButton as Button, ButtonGroupWrapper } from "../../ui/";

const LayoutModuleWidget = Object.assign(ButtonGroupWrapper, {
  SizeButton: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "editorSize", value = "1440_192", variant = "primary", optionsClass, style, children, ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
});

export default LayoutModuleWidget;
