import { Exclude, Expose } from "class-transformer";
import CommonDTO from "./common.dto";

export default class VmsFormDTO extends CommonDTO {
  @Exclude() // VMS폼ID
  @Expose({ name: "vmsFormId" })
  id: string = "";

  @Exclude() // VMS모듈종류
  @Expose({ name: "vmsModlKind" })
  public readonly kind: string = "";

  @Exclude() //	VMS폼유형
  @Expose({ name: "vmsFormType" })
  public readonly type: string = "";

  @Exclude() // VMS폼명
  @Expose({ name: "vmsFormNm" })
  public readonly name: string = "";

  @Exclude()
  @Expose({ name: "dsplEff" })
  public readonly effect: string = "";

  @Exclude()
  @Expose({ name: "dsplHr" })
  public readonly timer: number = 0;

  @Exclude() // 배경색상
  @Expose({ name: "backClr" })
  public readonly backgroundColor: string = "";

  @Exclude()
  @Expose({ name: "vmsFormImg" })
  public readonly blob: string = "";

  @Exclude()
  @Expose({ name: "rgstrId" })
  public readonly author: string = "";

  @Exclude()
  @Expose({ name: "regDt" })
  public readonly createdAt: string = "";

  @Exclude()
  @Expose({ name: "chngrId" })
  public readonly modifier: string = "";

  @Exclude()
  @Expose({ name: "chgDt" })
  public readonly updatedAt: string = "";
}
