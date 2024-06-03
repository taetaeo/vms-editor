import { fabric } from "fabric";
import { SelectedOptionConfigs } from "types";

export default class VideoModel extends fabric.Image {
  public objectId?: string;

  constructor(text: string, options: any) {
    super(text, options);
    this.objectId = options.id;
  }

  /**
   * Config옵션에 맞게 원하는 데이터 가져오기
   * @returns
   */

  public getObjectData<C extends object, T>(config?: C) {
    if (!config) return;

    return Object.entries(config)
      .filter(([_, value]) => value === true)
      .reduce((object, [key, _]) => {
        object[key] = this[key as keyof this];
        return object;
      }, {} as Record<string, any>);
  }

  public onUpdateOptions(option: SelectedOptionConfigs) {
    // return (this.selectedOptions = option);
  }
}
