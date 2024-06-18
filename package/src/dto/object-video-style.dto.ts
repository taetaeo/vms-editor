import { Exclude, Expose } from "class-transformer";
//

export default class VideoStyleDTO {
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

  public data() {
    return Object.keys(this).reduce((acc, key) => {
      acc[key] = (this as any)[key];
      return acc;
    }, {} as any);
  }
}
