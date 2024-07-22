import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";

export interface ButtonGroupWrapperProps extends R.HTMLAttributes<HTMLDivElement>, R.PropsWithChildren {
  groupClass?: string;
}

const ButtonGroupWrapper = R.forwardRef<HTMLDivElement, ButtonGroupWrapperProps>(function Components(
  { id = "", className = "edit_btline", groupClass = "", style, children, ...rest },
  fordedRef
) {
  return (
    <div id={id} className={cn(className, groupClass)} ref={fordedRef} style={style} {...rest}>
      {children}
    </div>
  );
});
export default ButtonGroupWrapper;
