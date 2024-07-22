import * as R from "react";
import type { StepperGroupStepperProps } from "../../ui/";
import { StepperGroupStepper as Stepper, StepperGroupWrapper } from "../../ui";

const ObjectSizeWidget = Object.assign(StepperGroupWrapper, {
  Width: R.forwardRef<HTMLInputElement, StepperGroupStepperProps>(
    (
      {
        // Stepper Props
        value,
        width = "120",
        isBorder = false,
        selected = false,
        style,
        children,
        ...rest
      },
      forwardedRef
    ) => (
      <Stepper
        // 너비 Stepper
        id="object_size_w"
        ref={forwardedRef}
        value={value}
        width={width}
        label={"너비"}
        {...rest}
        style={style}
      />
    )
  ),
  Height: R.forwardRef<HTMLInputElement, StepperGroupStepperProps>(
    (
      {
        // Stepper Props
        value,
        width = "120",
        isBorder = false,
        selected = false,
        style,
        children,
        ...rest
      },
      forwardedRef
    ) => (
      <Stepper
        // 높이 Stepper
        id="object_size_h"
        ref={forwardedRef}
        value={value}
        width={width}
        label={"높이"}
        {...rest}
        style={style}
      />
    )
  ),
});
export default ObjectSizeWidget;
