import type { HTMLAttributes, PropsWithChildren } from "react";
import * as R from "react";
import cn from "classnames";

export interface CanvasWidgetProps extends HTMLAttributes<HTMLCanvasElement>, PropsWithChildren {
  id?: string;
  optionClass?: string;
}

const CanvasWidget = R.forwardRef<HTMLCanvasElement, CanvasWidgetProps>(function Component(
  // Props
  { id, className = "vms-editor", optionClass = "", style, children, ...rest },
  // Ref
  forwardRef
) {
  return <canvas ref={forwardRef!} className={cn(className, optionClass)} id={id} style={style} {...rest} />;
});

export default CanvasWidget;
