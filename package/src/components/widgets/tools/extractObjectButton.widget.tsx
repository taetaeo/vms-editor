import * as R from "react";

import type { AnyModelListType } from "../../../types";
import { classNames as cn } from "../../../shared/lib/utils";
import { useCanvasCtxHandler } from "../../../shared/handlers";

interface Props extends R.HTMLAttributes<HTMLButtonElement>, R.PropsWithChildren {
  setState?: R.Dispatch<R.SetStateAction<AnyModelListType | null | undefined>>;
  btnClass?: string;
}

const ExtractObjectButtonWidget = R.forwardRef<HTMLButtonElement, Props>(function Component({
  // Props
  className = "vms-editor-extract-btn",
  btnClass = "",
  setState,
  onClick,
  style,
  children,
  ...rest
}) {
  const canvasCtx = useCanvasCtxHandler();

  return (
    <button
      className={cn("vms-editor-extract-btn", btnClass)}
      style={style}
      onClick={(e) => {
        const objectList = canvasCtx.canvas?.getObjectMatchingConfigs();

        if (onClick && typeof onClick === "function") {
          onClick(e);
        }

        if (setState && typeof setState === "function") {
          setState(objectList);
        }

        console.log("데이터 추출", objectList);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});

export default ExtractObjectButtonWidget;
