import * as R from "react";
import type { StepperGroupStepperProps } from "../../ui/";
import { StepperGroupStepper as Stepper, StepperGroupWrapper } from "../../ui";

const ObjectCoordWidget = Object.assign(StepperGroupWrapper, {
  CoordX: R.forwardRef<HTMLInputElement, StepperGroupStepperProps>(
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
        id="object_coord_x"
        ref={forwardedRef}
        value={value}
        width={width}
        label={"수평 이동"}
        {...rest}
        style={style}
      />
    )
  ),
  CoordY: R.forwardRef<HTMLInputElement, StepperGroupStepperProps>(
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
        label={"수직 이동"}
        {...rest}
        style={style}
      />
    )
  ),
});
export default ObjectCoordWidget;
