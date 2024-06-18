import { fabric } from "fabric";

export default class VideoModel extends fabric.Image {
  private element?: HTMLVideoElement;
  private objectId?: string;
  private options?: { [key in string]: any };

  constructor(element: HTMLVideoElement, options: any = {}) {
    super(element, options);
    new fabric.Image(this.element!, { ...this.options });
    this.element = element;
    this.objectId = options.objectId || options.id || options.vmsPictItemId;
    this.options = options;
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
}
