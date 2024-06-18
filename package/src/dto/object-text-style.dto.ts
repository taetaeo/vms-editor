import { Exclude, Expose } from "class-transformer";
import CommonDTO from "./common.dto";
//

export default class TextStyleDTO extends CommonDTO {
  @Exclude()
  @Expose({ name: "vmsTextItemId" })
  public objectId: string = "";

  @Exclude()
  @Expose({ name: "dsplTxt" })
  public text: string = "";

  @Exclude()
  @Expose({ name: "fontClr" })
  public fontColor: string = "";

  @Exclude()
  @Expose({ name: "fontSz" })
  public fontSize: number = 0;

  @Exclude()
  @Expose({ name: "fontThck" })
  public fontWeight: string = "";

  @Exclude()
  @Expose({ name: "txtAlgnMthd" })
  public textAlign: string = "";
}
