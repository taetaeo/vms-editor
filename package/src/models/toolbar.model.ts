"use strict";
import * as CSS from "csstype";

// Models
import { CanvasModel } from "@/models";
// Types
import { ToolbarSelectedOptionConfigs, ObjectVariant } from "@/types";
// Lib
import { Utils } from "@/lib";

type Parameters = {
  canvas?: CanvasModel<any, any, any>;
  selectedOptions: ToolbarSelectedOptionConfigs;
};

export default class ToolbarModel {
  /** 외부 모듈 */
  public utils?: Utils;
  public canvas?: CanvasModel<any, any, any>;

  /** 객체 타입 옵션 */
  public _type?: ObjectVariant;

  /** 객체 옵션 */
  public objectWidth?: number;
  public objectHeight?: number;
  public objectCoordX?: number;
  public objectCoordY?: number;
  public objectBackgroundColor: CSS.Properties["backgroundColor"];
  public objectBorderWidth: number;
  public objectBorderStyle: CSS.Properties["borderStyle"];
  public objectBorderColor: CSS.Properties["borderColor"];

  /** 폰트 옵션 */
  public fontSize?: number;
  public fontColor: CSS.Properties["color"];
  public fontBold?: number;
  public fontUnderLine?: boolean;
  public fontFamily?: string;

  private selectedOptions: ToolbarSelectedOptionConfigs;

  constructor(params: Parameters) {
    /** Outer Modules */
    this.utils = new Utils();

    /** Parameters */
    this.canvas = params.canvas;
    this.selectedOptions = params.selectedOptions;

    /** State */
    this._type = this.selectedOptions.type; // 객체 타입
    this.fontSize = this.selectedOptions.font.size; // 폰트 사이즈
    this.fontColor = this.selectedOptions.font.color; // 폰트 색상
    this.fontBold = this.selectedOptions.font.bold; // 굵은 글씨
    this.fontUnderLine = this.selectedOptions.font.underLine; // 밑줄 글씨
    this.fontFamily = this.selectedOptions.font.family; // 폰트 스타일
    this.objectWidth = this.selectedOptions.object.size.w; // 객체 너비
    this.objectHeight = this.selectedOptions.object.size.h; // 객체 높이
    this.objectCoordX = this.selectedOptions.object.coord.x; // 객체 X좌표
    this.objectCoordY = this.selectedOptions.object.coord.y; // 객체 Y좌표
    this.objectBackgroundColor = this.selectedOptions.object.style.background; // 객체 배경색
    this.objectBorderWidth = this.selectedOptions.object.style.border.width; // 객체 테두리 굵기
    this.objectBorderStyle = this.selectedOptions.object.style.border.style; // 객체 테두리 스타일
    this.objectBorderColor = this.selectedOptions.object.style.border.color; // 객체 테두리 색상
  }
  /**
   * 상태 변화를 위한 함수
   * @param {ToolbarSelectedOptionConfigs} selectedOptions
   * @returns {void}
   */

  public onChangeSelectedOption(selectedOptions: ToolbarSelectedOptionConfigs): void {
    this._type = selectedOptions.type;
    this.fontSize = selectedOptions.font.size;
    this.fontColor = selectedOptions.font.color;
    this.fontBold = selectedOptions.font.bold;
    this.fontUnderLine = selectedOptions.font.underLine;
    this.objectWidth = selectedOptions.object.size.w;
    this.objectHeight = selectedOptions.object.size.h;
    this.objectCoordX = selectedOptions.object.coord.x;
    this.objectCoordY = selectedOptions.object.coord.y;
    this.objectBackgroundColor = selectedOptions.object.style.background;
    this.objectBorderWidth = selectedOptions.object.style.border.width;
    this.objectBorderStyle = selectedOptions.object.style.border.style;
    this.objectBorderColor = selectedOptions.object.style.border.color;
  }

  /**
   * 객체 타입 설정 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 객체 타입 유형 변환
   */
  public onchangeObjectVariant(target: HTMLButtonElement | HTMLInputElement, objectId: string) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    /**
     * 실행취소. value의 타입이 'ObjectVariant' 이 아닐 경우.
     */

    if (!this.isValidObjectVariant(value)) {
      return;
    }

    this._type = value as ObjectVariant;

    this.canvas?.onCreateObject(value, "텍스트를 입력해주세요.", {
      id: objectId,
      left: this.objectCoordX, // x 축
      top: this.objectCoordY, // Y축
      width: this.objectWidth, // 너비
      height: this.objectHeight, // 높이
      fontSize: this.fontSize || 14, // 폰트 사이즈
      fill: this.fontColor, // 폰트 색상
      fontWeight: this.fontBold, // 굵기
      underline: this.fontUnderLine, // 밑줄
      fontFamily: this.fontFamily, // 폰트 스타일
      backgroundColor: this.objectBackgroundColor, // 배경색
      selectionBorderColor: this.objectBorderColor,
    });
  }

  /**
   * 폰트 굵기 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 굵기 사이즈 변환 (number)
   */
  public onchangeFontBold(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [font, bold] = this.idSplitHelper(id);
    const isFont = this.utils?.isBeingChecker(font);
    const isBold = this.utils?.isBeingChecker(bold);

    /**
     * 실행취소. font 또는 bold 가 없을 경우.
     */
    if (!isFont || !isBold) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */
    let NEW_Font_Bold: number = Number(value);
    if (Number.isNaN(Number(NEW_Font_Bold))) {
      NEW_Font_Bold = 400; // 기본값 설정
    }

    this.fontBold = NEW_Font_Bold === 700 ? 400 : 700;
  }

  /**
   * 폰트 사이즈 이벤트 핸들러
   * @param {HTMLSelectElement} target
   * @returns {void} - 사이즈 px 변환 (number)
   */
  public onchangeFontSize(target: HTMLSelectElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [font, size] = this.idSplitHelper(id);

    const isFont = this.utils?.isBeingChecker(font);
    const isSize = this.utils?.isBeingChecker(size);

    if (!isFont || !isSize) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */

    let NEW_FontSize: number = Number(value);
    if (Number.isNaN(NEW_FontSize)) {
      NEW_FontSize = 12; // 기본값 설정
    }
    this.fontSize = NEW_FontSize;
  }

  /**
   * 폰트 밑줄 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 밑줄 활성화 변환 (boolean)
   */
  public onchangeFontUnderLine = (target: HTMLButtonElement | HTMLInputElement) => {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [font, underline] = this.idSplitHelper(id);

    const isFont = this.utils?.isBeingChecker(font);
    const isUnderLine = this.utils?.isBeingChecker(underline);

    /**
     * 실행취소. font 또는 underline이 없을 경우.
     */

    if (!isFont || !isUnderLine) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */
    let NEW_Font_Underline: number = Number(value);
    if (Number.isNaN(NEW_Font_Underline)) {
      NEW_Font_Underline = 1; // 기본값 설정
    }

    this.fontUnderLine = NEW_Font_Underline === 1 ? false : true;
  };

  /**
   * 객체 사이즈 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 너비(w) 높이(h) 변환
   */
  public onchangeObjectSize(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [obj, size, unknownValue] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isSize = this.utils?.isBeingChecker(size);
    const isUnknownValue = this.utils?.isBeingChecker(unknownValue);

    /**
     * 실행취소. object 또는 size 또는 w/h가 없을 경우.
     */

    if (!isObj || !isSize || !isUnknownValue) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */
    let NEW_UNKNOWN_VALUE: number = Number(value);
    if (Number.isNaN(NEW_UNKNOWN_VALUE)) {
      NEW_UNKNOWN_VALUE = 200; // 기본값 설정
    }

    if (unknownValue === "w") {
      this.objectWidth = NEW_UNKNOWN_VALUE; // 너비
    } else if (unknownValue === "h") {
      this.objectHeight = NEW_UNKNOWN_VALUE; // 높이
    }
  }

  /**
   * 객체 좌표 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - x(가로축) y(세로축) 변환
   */
  public onchangeObjectCoord(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }
    const [obj, coord, unknownValue] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isCoord = this.utils?.isBeingChecker(coord);
    const isUnknownValue = this.utils?.isBeingChecker(unknownValue);

    /**
     * 실행취소. object 또는 size 또는 w/h가 없을 경우.
     */

    if (!isObj || !isCoord || !isUnknownValue) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */
    let NEW_UNKNOWN_VALUE: number = Number(value);
    if (Number.isNaN(NEW_UNKNOWN_VALUE)) {
      NEW_UNKNOWN_VALUE = 10; // 기본값 설정
    }
    if (unknownValue === "x") {
      this.objectWidth = NEW_UNKNOWN_VALUE; // x 좌표
    } else if (unknownValue === "y") {
      this.objectHeight = NEW_UNKNOWN_VALUE; // y 좌표
    }
  }
  /**
   * 객체 배경 색상 이벤트 핸들러 (1) - 색상
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 배경색상 변환
   */
  public onchangeObjectBackgroundColor(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [obj, background, color] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isBackground = this.utils?.isBeingChecker(background);
    const isColor = this.utils?.isBeingChecker(color);

    /**
     * 실행취소. object 또는 border 또는 color가 없을 경우.
     */
    if (!isObj || !isBackground || !isColor) {
      return;
    }

    this.objectBackgroundColor = value;
  }

  /**
   * 객체 윤곽선 이벤트 핸들러
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 윤곽선 색상 변환
   */
  public onchangeObjectBorderColor(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [obj, border, color] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isBorder = this.utils?.isBeingChecker(border);
    const isColor = this.utils?.isBeingChecker(color);

    /**
     * 실행취소. object 또는 border 또는 color가 없을 경우.
     */
    if (!isObj || !isBorder || !isColor) {
      return;
    }
  }
  /**
   * 객체 윤곽선 이벤트 핸들러 (2) - 스타일
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 윤곽선 스타일 변환
   */
  public onchangeObjectBorderStyle(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [obj, border, style] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isBorder = this.utils?.isBeingChecker(border);
    const isStyle = this.utils?.isBeingChecker(style);

    /**
     * 실행취소. object 또는 border 또는 style가 없을 경우.
     */
    if (!isObj || !isBorder || !isStyle) {
      return;
    }

    this.objectBorderStyle = value;
  }

  /**
   * 객체 윤곽선 이벤트 핸들러 (3) - 굵기
   * @param {HTMLButtonElement | HTMLInputElement} target
   * @returns {void} - 윤곽선 스타일 변환
   */
  public onchangeObjectBorderWidth(target: HTMLButtonElement | HTMLInputElement) {
    const { id, value } = target;

    const isId = this.utils?.isBeingChecker(id);
    const isValue = this.utils?.isBeingChecker(value);

    /**
     * 실행취소. id 또는 value가 없을 경우.
     */
    if (!isId || !isValue) {
      return;
    }

    const [obj, border, width] = this.idSplitHelper(id);

    const isObj = this.utils?.isBeingChecker(obj);
    const isBorder = this.utils?.isBeingChecker(border);
    const isWidth = this.utils?.isBeingChecker(width);

    /**
     * 실행취소. object 또는 border 또는 width가 없을 경우.
     */
    if (!isObj || !isBorder || !isWidth) {
      return;
    }

    /**
     * 예외처리. value를 number로 형변환시 NaN일 경우.
     */
    let NEW_OBJ_WIDTH: number = Number(value);
    if (Number.isNaN(NEW_OBJ_WIDTH)) {
      NEW_OBJ_WIDTH = 10; // 기본값 설정
    }

    this.objectBorderWidth = NEW_OBJ_WIDTH;
  }

  /**
   * =================================================
   *                  P R V A T E
   * =================================================
   */

  /**
   * DOM의 ID의 문자열을 '_' 기준으로 분할하여 배열로 만드는 함수
   * @param {string} str
   * @returns {string[]}
   */

  private idSplitHelper(str: string): string[] {
    return str.split("_");
  }

  /**
   * ObjectVariant 에 대한 타입가드 함수
   * @param {string} value
   * @returns
   */
  private isValidObjectVariant(value: string): value is ObjectVariant {
    return ["rect", "circle", "text", "image", "video"].includes(value);
  }
}
