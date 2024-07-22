import * as R from "react";
import { classNames as cn } from "../../../shared/lib/utils";
import { VmsFormObjectDTO } from "../../../shared/dto";

interface Props extends R.HTMLAttributes<HTMLElement>, R.PropsWithChildren {
  selectedData?: VmsFormObjectDTO;
  labelClass?: string;
  titleClass?: string;
  nameClass?: string;
}

const InfoBoxWidget: React.FC<Props> = ({
  // Props
  className = "",
  labelClass = "",
  titleClass = "",
  nameClass = "",
  selectedData = undefined,
  style,
  children,
  ...rest
}) => {
  return (
    <div className={cn("vms-editor-info-box-wrap", className)} style={style} {...rest}>
      {selectedData?._id && (
        <label className={cn("info-box-item-label", labelClass)}>
          <span className={cn("info-box-item-title", titleClass)}>아이디</span>
          <span className={cn("info-box-item-name", nameClass)}>{selectedData?._id}</span>
        </label>
      )}
      {selectedData?.w && (
        <label className={cn("info-box-item-label", labelClass)}>
          <span className={cn("info-box-item-title", titleClass)}>높이</span>
          <span className={cn("info-box-item-name", nameClass)}>{selectedData?.w}</span>
        </label>
      )}
      {selectedData?._id && (
        <label className={cn("info-box-item-label", labelClass)}>
          <span className={cn("info-box-item-title", titleClass)}>너비</span>
          <span className={cn("info-box-item-name", nameClass)}>{selectedData?.h}</span>
        </label>
      )}
      {selectedData?.coordX && (
        <label className={cn("info-box-item-label", labelClass)}>
          <span className={cn("info-box-item-title", titleClass)}> X 위치 </span>
          <span className={cn("info-box-item-name", nameClass)}>{selectedData?.coordX}</span>
        </label>
      )}
      {selectedData?.coordY && (
        <label className={cn("info-box-item-label", labelClass)}>
          <span className={cn("info-box-item-title", titleClass)}>Y 위치</span>
          <span className={cn("info-box-item-name", nameClass)}>{selectedData?.coordY}</span>
        </label>
      )}
    </div>
  );
};

export default InfoBoxWidget;
