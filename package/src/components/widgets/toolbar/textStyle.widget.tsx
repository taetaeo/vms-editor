import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";
import type { ButtonGroupButtonProps, ButtonGroupSelectorProps, ButtonGroupWrapperProps } from "../../ui";
import { ButtonGroupButton as Button, ButtonGroupSelector } from "../../ui";

interface TextStyleButtonGroupProps extends R.PropsWithChildren, ButtonGroupWrapperProps {
  groupClass?: string;
}

const ButtonGroupWrapper = R.forwardRef<HTMLDivElement, TextStyleButtonGroupProps>(function Components(
  { id = "", className = "edit_btline", groupClass = "", style, children, ...rest },
  fordedRef
) {
  return (
    <div id={id} className={cn(className, groupClass)} ref={fordedRef} style={style} {...rest}>
      {children}
    </div>
  );
});

const TextStyleWidget = Object.assign(ButtonGroupWrapper, {
  Bold: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "font_align", value = "", variant = "primary", optionsClass, style, children = "굵게", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  Underline: R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(
    ({ id = "font_underline", value = "", variant = "primary", optionsClass, style, children = "밑줄", ...rest }, forwardedRef) => (
      <Button ref={forwardedRef} id={id} value={value} variant="primary" optionsClass={optionsClass} style={style} {...rest}>
        {children}
      </Button>
    )
  ),
  FontSize: ({ id = "font_size", size = "sm", list = [], value = "", defaultValue = 0, style, children, ...rest }: ButtonGroupSelectorProps) => (
    <ButtonGroupSelector list={list} id={id} size={size} value={value} defaultValue={defaultValue} style={style} {...rest} />
  ),
});

export default TextStyleWidget;
