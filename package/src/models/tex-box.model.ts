import { fabric } from "fabric";
import * as CSS from "csstype";
import { CanvasType } from "@/app/types";
import { ThemeConfigs } from "@/app/interfaces";
import ToolbarModel from "./toolbar.model";

type TextConfig = ThemeConfigs<CanvasType>["canvas"]["objects"]["text"];

export default class TextBoxModel extends fabric.Textbox {
  /** 외부 모듈 */

  public toolbar?: ToolbarModel;

  /** ========================== ==========================
   *  ========================== ==========================
   */

  // 추가적인 커스텀 속성이나 메소드를 정의
  private textConfig?: TextConfig;
  public objectId?: string;
  public size?: number = 100;
  public color: CSS.Properties["color"] = "#fff";
  public fontWeight: CSS.Properties["fontWeight"] = 400;

  constructor(text: string, options?: any, configs?: TextConfig) {
    super(text, options); // 부모 클래스의 생성자를 호출
    // 여기에서 커스텀 초기화 코드를 추가
    // this.toolbar = new ToolbarModel();

    this.textConfig = configs;
    this.size = this.textConfig?.size;

    this.objectId = options.id;
    this.color = options.fill;
    this.fontWeight = options.fontWeight;
    this.backgroundColor = options.backgroundColor;
    this.borderColor = options.stroke;

    this.on("scaling", this.onResizeScaling);
    this.on("selection:created", function () {
      console.log("객체 선택함 1 ");
    });
    this.on("mouse:down", function () {
      console.log("객체 선택함 2 ");
    });

    this.on("object:selected", function () {
      console.log("객체 선택함 3");
    });

    this.on("mouseup", (e) => {
      // console.log("객체 이벤트", e);
      // console.log("객체 선택함 4", this.objectId);
    });
  }

  public onChangeStyle(key: string, value: unknown) {
    this.set(key as any, value);
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
  private onResizeScaling = () => {
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

    this.set({ fontSize: newFontSize } as object);
    this.setCoords();
  };

  // private onChangeBorder = (e: any) => {
  //   const { selectedObject } = e.target;
  //   this.set({ selectionBorderColor: "green" } as object);
  // };
}
