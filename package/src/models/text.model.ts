"use strict";
import { fabric } from "fabric";
import * as CSS from "csstype";

import { ToolbarModel } from "models";

import { ToolbarSelectedOptionConfigs } from "types";

export default class TextModel extends fabric.Textbox {
  /** 외부 모듈 */

  public toolbar?: ToolbarModel;

  /** ========================== ==========================
   *  ========================== ==========================
   */
  // 추가적인 커스텀 속성이나 메소드를 정의
  public objectId?: string;
  public size?: number = 100;
  public color: CSS.Properties["color"] = "#fff";
  public fontWeight: CSS.Properties["fontWeight"] = 400;

  public pointer: { start: number; end: number } = { start: 0, end: 0 };

  private selectedOptions?: ToolbarSelectedOptionConfigs;
  constructor(text: string, options?: any) {
    super(text, options); // 부모 클래스의 생성자를 호출
    // 여기에서 커스텀 초기화 코드를 추가
    // this.toolbar = new ToolbarModel();

    this.objectId = options.id;
    this.color = options.fill;
    this.fontWeight = options.fontWeight;
    this.backgroundColor = options.backgroundColor;
    this.borderColor = options.stroke;
    this.canvas = options.canvas;

    this.on("scaling", this.onResizeScaling);

    this.on("mousedown:before", function (e) {
      // 마우스가 내려오기전
      console.log("🟦 \t\t mousedown:before :", e);
    });
    this.on("mousedown", function (e) {
      // 마우스가 내려올때
      console.log("🟦 \t\t mousedown : ", e);
    });
    this.on("mouseup:before", function (e) {
      // 마우스가 올라오기전
      console.log("🟦 \t\t mouseup:before :", e);
    });
    this.on("mouseup", (e) => {
      // 마우스가 올라올때
      console.log("🟦 \t\t mouseup : ", e);
    });
    this.on("mouseover", function (e) {
      // 마우스가 객체에 접근했을때,
      // console.log("🟦 \t\t mouseover : ", e);
    });
    this.on("mouseout", function (e) {
      // 마우스가 객체에서 벗어날때
      // console.log("🟦 \t\t mouseout : ", e);
    });
    this.on("skewing", function (e) {
      console.log("🟦 \t\t skewing : ", e);
    });
    this.on("selection:created", function (e) {
      // const selectedText = e.target.text.slice(e.target.selectionStart, e.target.selectionEnd);
      console.log("🟦 \t\t selection:created : ", e);
    });
    this.on("selection:changed", (e) => {
      console.log("🟦 \t\t 선택한 모델의 ID : ", this.objectId);

      const start = this.selectionStart; // 선택 시작
      const end = this.selectionEnd; // 선택 마지막

      if (!start || !end) return;

      this.pointer.start = start;
      this.pointer.end = end;
    });
  }

  public onUpdateOptions(option: ToolbarSelectedOptionConfigs) {
    return (this.selectedOptions = option);
  }

  public onChangeStyle(key: string, value: unknown, type: "font" | "object") {
    if (type === "font") return this.setSelectionStyles({ [key]: value }, this.selectionStart, this.selectionEnd || this._text.length);
    else if (type === "object") return this.set(key as any, value);
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

  /**
   * 객체 리사이즈시에 변경된 값처리
   */
  private onResizeScaling = (e: fabric.IEvent<MouseEvent>) => {
    console.log("🟦 \t\t Resize :", e);

    const newWidth: number = this.getScaledWidth();
    const newHeight: number = this.getScaledHeight();
    const scalingFactor: number = this.scaleX || 1;
    const fontSize: number = this.fontSize || 10;
    const newFontSize: number = fontSize * scalingFactor || 12;

    console.log(` 
    ====== Resize Object =====
      너비 : ${newWidth}
      높이 : ${newHeight}
      폰트사이즈 : ${newFontSize}
    
    `);

    this.setSelectionStyles({ fontSize: newFontSize }, 0, this._text.length);
    this.setCoords();
  };
}
