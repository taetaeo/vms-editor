import * as R from "react";
import { classNames as cn } from "../../../shared/lib/utils";

export interface ButtonGroupSelectorProps extends R.HTMLAttributes<HTMLElement> {
  type?: string;
  value?: string | number;
  list: (string | number)[];
  defaultValue: string | number;
  onChange: (event: R.ChangeEvent<HTMLSelectElement>) => void;
  size: "sm" | "md";
}

const ButtonGroupSelector: R.FC<ButtonGroupSelectorProps> = ({
  list = [],
  size = "sm",
  value = "",
  type = "btn_group_selector",
  defaultValue = 0,
  onChange,
}) => {
  if (list.length === 0) return null;
  return (
    <select className={cn("selector color", { [size]: true })} value={value} onChange={onChange}>
      {list?.map((data, i) => {
        return (
          <option key={`${type}-${i}`} value={data}>
            {data ? data : defaultValue}
          </option>
        );
      })}
    </select>
  );
};

export default ButtonGroupSelector;
