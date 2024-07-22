import type { HTMLAttributes, PropsWithChildren } from "react";
import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";

export interface CanvasProps extends HTMLAttributes<HTMLCanvasElement>, PropsWithChildren {
  id?: string;
  optionClass?: string;
}

const Canvas = R.forwardRef<HTMLCanvasElement, CanvasProps>(function Component(
  // Props
  { id, className = "vms-editor", optionClass = "", style, children, ...rest },
  // Ref
  forwardRef
) {
  return <canvas ref={forwardRef!} className={cn(className, optionClass)} id={id} style={style} {...rest} />;
});

export default Canvas;
