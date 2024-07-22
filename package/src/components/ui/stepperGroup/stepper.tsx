import * as R from "react";

import { classNames as cn } from "../../../shared/lib/utils";
import { ArrowIcon } from "..";

export interface StepperGroupStepperProps extends R.HTMLAttributes<HTMLElement>, R.PropsWithChildren {
  label?: string;
  value: number | string;
  selected?: boolean;
  isBorder?: boolean;
  width: "24" | "32" | "40" | "48" | "72" | "90" | "96" | "104" | "108" | "112" | "116" | "120" | "128" | "140" | "196" | "224";
  onClick?: (e: R.MouseEvent<HTMLButtonElement>) => void;
}
const StepperGroupStepper = R.forwardRef<HTMLInputElement, StepperGroupStepperProps>(
  ({ id = "", label = "너비", value = "", width = "120", isBorder = false, selected = false, onClick = undefined, style, children, ...rest }, fordedRef) => {
    return (
      <>
        {label && <span style={{ width: "32px" }}>{label}</span>}
        <div className="stepper_box gap_2 m-l-8" style={style}>
          <input ref={fordedRef} type="text" className={cn("wrput", { line: isBorder, tac: true, [`w${width}`]: true, selected: selected })} value={value} />
          <button
            type="button"
            id={`${id}_up`}
            value={value}
            className="stepper_arrow up on"
            onClick={(e) => {
              if (onClick && typeof onClick === "function") {
                onClick(e);
              }
            }}
          >
            <ArrowIcon width="12" height="12" style={{ pointerEvents: "none" }} />
          </button>
          <button
            type="button"
            id={`${id}_down`}
            value={value}
            className="stepper_arrow down on"
            onClick={(e) => {
              if (onClick && typeof onClick === "function") {
                onClick(e);
              }
            }}
          >
            <ArrowIcon width="12" height="12" style={{ pointerEvents: "none" }} />
          </button>
        </div>
        <span style={{ width: "" }}>{value + "px"}</span>
      </>
    );
  }
);
export default StepperGroupStepper;
