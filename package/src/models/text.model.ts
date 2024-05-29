import { fabric } from "fabric";
import { ThemeConfigs } from "@/app/interfaces";

type CanvasType = "1200";
type TextConfig = ThemeConfigs<CanvasType>["canvas"]["objects"]["text"];

export default class TextModel extends fabric.Text {
  // 추가적인 커스텀 속성이나 메소드를 정의
  textConfig?: TextConfig;

  constructor(text: string, options?: fabric.ITextOptions, configs?: TextConfig) {
    super(text, options); // 부모 클래스의 생성자를 호출
    // 여기에서 커스텀 초기화 코드를 추가
    this.textConfig = configs;
  }
}
