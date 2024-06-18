import { Exclude, Expose } from "class-transformer";
//
import { ProsAndConsYN } from "../types";
import CommonDTO from "./common.dto";

export default class VmsFormObjectDTO extends CommonDTO {
  @Exclude() // VMS폼ID
  @Expose({ name: "vmsFormId" })
  public readonly parentsId: string = "";

  @Exclude()
  @Expose({ name: "sn" })
  public readonly sn: number = 0;

  @Exclude()
  @Expose({ name: "vmsFormObjKind" })
  public readonly _kind: string = "";

  @Exclude()
  @Expose({ name: "vmsFormObjId" })
  public readonly _id: string = "";

  @Exclude()
  @Expose({ name: "backClr" })
  public readonly backgroundColor: string = "";

  @Exclude()
  @Expose({ name: "formObjPstnX" })
  public readonly coordX: number = 0;

  @Exclude()
  @Expose({ name: "formObjPstnY" })
  public readonly coordY: number = 0;

  @Exclude()
  @Expose({ name: "formObjDsplWdth" })
  public readonly w: number = 0;

  @Exclude()
  @Expose({ name: "formObjDsplHght" })
  public readonly h: number = 0;

  @Exclude()
  @Expose({ name: "formObjBlnkYn" })
  public readonly isBlank: ProsAndConsYN = "N";

  @Expose({ name: "style" })
  public style: any = {};
}
