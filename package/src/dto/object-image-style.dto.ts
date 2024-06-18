import { Exclude, Expose } from "class-transformer";
//

export default class ImageStyleDTO {
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

  public data() {
    return Object.keys(this).reduce((acc, key) => {
      acc[key] = (this as any)[key];
      return acc;
    }, {} as any);
  }
}
