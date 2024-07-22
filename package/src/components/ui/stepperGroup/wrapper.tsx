import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";

export interface StepperGroupWrapperProps extends R.HTMLAttributes<HTMLDivElement>, R.PropsWithChildren {
  groupClass?: { [key in string]: boolean };
}

const StepperGroupWrapper = R.forwardRef<HTMLDivElement, StepperGroupWrapperProps>(function Components(
  { id = "", className = "dflx_ac", groupClass = { "m-b-12": true }, style, children, ...rest },
  fordedRef
) {
  return (
    <div id={id} className={cn(className, { gap_colm8: true, ...groupClass })} ref={fordedRef} style={style} {...rest}>
      {children}
    </div>
  );
});
export default StepperGroupWrapper;
