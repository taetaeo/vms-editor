import { Exclude, Expose } from "class-transformer";
import CommonDTO from "./common.dto";

/**
 * VMS_MODL_KIND	VMS모듈종류	VARCHAR2(10 BYTE)
 * VMS_MODL_KIND_NM	VMS모듈종류명	VARCHAR2(32 BYTE)
 * VMS_MODL_ROW	VMS모듈단	NUMBER(2,0)
 * VMS_MODL_COL	VMS모듈열	NUMBER(2,0)
 * MODL_PIXL_WDTH	모듈화소넓이	NUMBER(4,0)
 * MODL_PIXL_HGHT	모듈화소높이	NUMBER(4,0)
 * MODL_CLR	모듈색상	VARCHAR2(3 BYTE)
 * RPRS_YN	대표여부	CHAR(1 BYTE)
 * USE_YN	사용여부	CHAR(1 BYTE)
 * RGSTR_ID	등록자 ID	VARCHAR2(10 BYTE)
 * REG_DT	등록일시	DATE
 * CHNGR_ID	변경자 ID	VARCHAR2(10 BYTE)
 * CHG_DT	변경일시	DATE
 */

export default class VmsFormModuleDTO extends CommonDTO {
  @Exclude() // VMS 모듈 종류
  @Expose({ name: "vmsModlKind" })
  moduleKind: string = "";

  @Exclude() //
  @Expose({ name: "vmsModlKindNm" })
  moduleKindName: string = "";

  @Exclude()
  @Expose({ name: "vmsModlRow" })
  row: number = 0;

  @Exclude()
  @Expose({ name: "vmsModlCol" })
  col: number = 0;

  @Exclude()
  @Expose({ name: "modlPixlWdth" })
  pixelWidth: number = 0;

  @Exclude()
  @Expose({ name: "modlPixlHght" })
  pixelHeight: number = 0;

  @Exclude()
  @Expose({ name: "modlClr" })
  color: string = "FC";
}
