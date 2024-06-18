"use strict";
import { fabric } from "fabric";
import { ToolbarSelectedOptionConfigs } from "../types";

export default class ImageModel extends fabric.Image {
  public objectId?: string;
  public src?: string;
  public image?: fabric.Image;
  public options?: { [key in string]: any };

  constructor(src: string, options: any) {
    super(options.image.getElement(), options);
    this.src = src;
    this.objectId = options?.objectId || options.id;
    this.options = options;
    options.image.getElement();
    this.image = options.image;
  }

  public getImageElement() {
    this.image && this.image.getElement();
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

  public getObjectAnyData(config?: any) {
    if (!config) return;

    return Object.entries(config)
      .filter(([_, value]) => value === true)
      .reduce((object, [key, _]) => {
        object[key] = this[key as keyof this];
        return object;
      }, {} as Record<string, any>);
  }

  public onUpdateOptions(option: ToolbarSelectedOptionConfigs) {
    // return (this.selectedOptions = option);
  }
}
