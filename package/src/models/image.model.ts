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

  public getObject() {
    const { image, ...rest } = this;
    image?.set<any>("objectId", rest?.objectId);
    return image;
  }

  public getImageElement() {
    this.image && this.image.getElement();
  }

  /**
   * @event 이미지변환 - Url로부터 이미지를 불러오는 이벤트
   * @returns {Promise | undefined} - 불러온 이미지에 대해 Promise를 반환합니다.
   */
  public createImageFromUrl() {
    if (!this.src) return;

    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(this.src!, (image) => {
        if (image) {
          this.image = image as fabric.Image;
          resolve(image);
        } else {
          reject(new Error("이미지 로드 실패"));
        }
      });
    });
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
