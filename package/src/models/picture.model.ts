"use strict";
import { fabric } from "fabric";

export default class PictureModel extends fabric.Image {
  public image?: fabric.Image;

  constructor(image: fabric.Image) {
    super(image.getElement(), image);
    this.image = image;
  }
}
