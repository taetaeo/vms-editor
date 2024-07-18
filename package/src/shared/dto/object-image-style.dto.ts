import { Exclude, Expose } from "class-transformer";
import CommonDTO from "./common.dto";

export default class ImageStyleDTO extends CommonDTO {
  @Exclude()
  @Expose({ name: "vmsTextItemId" })
  public objectId: string = "";

  @Exclude()
  @Expose({ name: "pcitNm" })
  public name: string = "";

  @Exclude()
  @Expose({ name: "pictData" })
  public src: string = "";

  @Exclude()
  @Expose({ name: "pictWdth" })
  public pictWidth: number = 0;

  @Exclude()
  @Expose({ name: "pictHght" })
  public pictHeight: number = 0;

  @Exclude()
  @Expose({ name: "pictDataSz" })
  public pictDataSize: string = "";

  @Exclude()
  @Expose({ name: "pictType" })
  public pictType: string = "";
}
