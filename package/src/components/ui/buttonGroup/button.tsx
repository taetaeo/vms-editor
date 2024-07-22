import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";

export interface ButtonGroupButtonProps extends R.HTMLAttributes<HTMLButtonElement>, R.PropsWithChildren {
  id?: string;
  value?: string | number;

  variant?: "primary" | "secondary";
  /** Key : class-name , value : active state (true : active, false : inactive) */
  optionsClass?: { [key in string]: boolean };
}

const Button = R.forwardRef<HTMLButtonElement, ButtonGroupButtonProps>(function Component(
  { id, value, variant = "primary", className = "btn", optionsClass, style, children, ...rest },
  forwardedRef
) {
  return (
    <button id={id} value={value} ref={forwardedRef} className={cn(`${className}_${variant}`, ["btn_ms", optionsClass])} style={style} {...rest}>
      {children}
    </button>
  );
});

export default Button;
