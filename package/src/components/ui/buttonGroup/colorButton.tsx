import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";

export interface ButtonGroupColorButtonProps extends R.HTMLAttributes<HTMLButtonElement>, R.PropsWithChildren {
  id?: string;
  value?: string | number;

  variant?: "primary" | "secondary";
  color?: string;
  /** Key : class-name , value : active state (true : active, false : inactive) */
  optionsClass?: { [key in string]: boolean };
}

const Button = R.forwardRef<HTMLButtonElement, ButtonGroupColorButtonProps>(function Component(
  { id, value, variant = "secondary", className = "btn", optionsClass, color = "red", style, children, ...rest },
  forwardedRef
) {
  return (
    <button
      id={id}
      value={value}
      ref={forwardedRef}
      className={cn(`${className}_${variant}`, ["btn_s_w28h28", { [`edit_${color}`]: true, ...optionsClass }])}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
