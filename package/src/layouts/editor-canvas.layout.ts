"use strict";
import { fabric } from "fabric";
import { type CanvasConfigs, ObjectConfigs } from "../configs";
import { Utils } from "../lib";
import { ObjectConfigState } from "../states";
import { ToolbarSelectedOptionConfigs } from "../types";
import { ImageModel, TextBoxModel, TextModel, VideoModel } from "../models";
import { GridLayout } from "../layouts";

type CanvasObject = fabric.Object;
type AnyObject = TextModel | TextBoxModel | ImageModel | VideoModel;
type ObjectList = AnyObject[] | CanvasObject[];
type CallbackFunction = (objects?: ObjectList | null) => void;

type Parameters = {
  current: HTMLCanvasElement;
  configs: CanvasConfigs;
  selectedUpdatedFn: CallbackFunction;
};

export default class EditorLayout<T extends object, I extends object, V extends object> extends fabric.Canvas {
  public context: CanvasRenderingContext2D | null; // Canvas's context
  public selectedObjects?: ObjectList | null;

  private needObjectList: unknown[]; // 데이터를 추출하고자 하는 객체 리스트
  private utils?: Utils; // 공통으로 사용할 함수
  private configs?: ObjectConfigState<T, I, V> | null;

  private selectedOptions?: ToolbarSelectedOptionConfigs;

  constructor(params: Parameters) {
    super(params.current, params.configs);
    this.context = null;

    /** Private */
    this.needObjectList = [];
    this.utils = new Utils();
    this.configs = null;

    /** Event Trigger */
    this.on("dragenter", function (e) {
      // Drag로 접근했을때
      console.log("🟥 \t dragenter : ", e);
    });
    this.on("dragover", function (e) {
      // Drag로 위에 올라와있을 때
      console.log("🟥 \t dragover : ", e);
    });
    this.on("dragleave", function (e) {
      // Drag가 사라졌을 때
      console.log("🟥 \t dragleave : ", e);
    });
    this.on("drop:before", function (e) {
      // Drag가 끝나고 Drop을 시작하기 전
      console.log("🟥 \t drop:before : ", e);
    });
    this.on("drop", function (e) {
      // Drop 전단계가 끝나고 Drop이 완료되었을 때
      console.log("🟥 \t drop : ", e);
    });

    this.on("selection:created", ({ e, selected }) => {
      console.log("🟥 \t selection:created : ", { e, selected });

      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as ObjectList);

      this.get_selected_objects(selected! as ObjectList);
    });

    this.on("object:selected", (e) => {
      console.log("🟥 \t object:selected :", e);
    });

    this.on("selection:updated", ({ deselected, e, selected }) => {
      console.log("🟥 \t selection:updated :", selected);

      /** 선택한 객체가 없을 경우 */
      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as ObjectList);

      this.get_selected_objects(selected! as ObjectList);
      return selected;
    });

    this.on("mouseup", (e) => {
      console.log("🟥 \t mouseup :", e);
      // this.selectedObjects = e.target;
    });

    this.on("mouse:down", (e) => {
      console.log("🟥 \t mouse:down :", e);
      // 아무런 객체가 없을 경우
      if (!e.target) {
        this.selectedObjects = undefined;
      } else {
        console.log("🟥 \t 객체가 있습니다. : ", e.target);
      }
    });
  }

  /**
   * ====================================================================
   *                           public Methods
   * ====================================================================
   */
  /**
   * @event GET - Canvas의 Context를 호출하는 이벤트
   */
  public getCanvasContext(): CanvasRenderingContext2D | null {
    this.context = this.getContext();
    return this.context;
  }
  /**
   * @event GET - Canvas에 있는 객체들 전부 가져오는 이벤트
   */

  public getObjectsFromCanvas() {
    return this._objects;
  }

  /**
   * @event GET - Canvas에 있는 객체들 중, Config에따라 필요한 데이터만 추출
   */
  public onGetObjectFromConfigs(): ObjectList | null {
    const rawDataList = this.getObjectsFromCanvas();

    // 빈 배열일 경우
    if (this.utils?.isEmptyArray(rawDataList)) return null;

    // 스택을 통한 데이터 추출 및 가공
    while (!this.utils?.isEmptyArray(rawDataList)) {
      // 1. 객체 꺼내기
      const poppedObject = rawDataList.pop(); // 2. 꺼낸 객체 선언

      // 3. 객체 유형 파악하기
      // 3-1. 텍스트 박스 객체 가져오기
      if (this.utils?.whatInstance(poppedObject, TextBoxModel)) {
        // 3-2. 알고자 하는 값 가져오기
        const needToKnowData = poppedObject.getObjectData<T, TextBoxModel>(this.configs?.textObjectConfig);

        // 3-3. 정제된 데이터 배열에 넣기 - 중복된 ID를 가진 요소를 찾아서 최신 값으로 덮어 씌움

        const foundIndex = this.utils.getUniqueElement(this.needObjectList, needToKnowData?.objectId);

        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-2. 텍스트 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, TextModel)) {
        const needToKnowData = poppedObject.getObjectData<T, TextModel>(this.configs?.textObjectConfig);
        const foundIndex = this.utils.getUniqueElement(this.needObjectList, needToKnowData?.objectId);
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-3. 이미지 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, ImageModel)) {
        const needToKnowData = poppedObject.getObjectData<I, ImageModel>(this.configs?.imageObjectConfig);
        const foundIndex = this.utils.getUniqueElement(this.needObjectList, needToKnowData?.objectId);
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-4 비디오 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, VideoModel)) {
        const needToKnowData = poppedObject.getObjectData<V, VideoModel>(this.configs?.videoObjectConfig);
        const foundIndex = this.utils.getUniqueElement(this.needObjectList, needToKnowData?.objectId);
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
    }
    return this.needObjectList as ObjectList;
  }

  /**
   * @event 변경 - Toolbar에서 선택한 옵션 값의 변경 이벤트
   * */
  public onChangeConfigsOption(options: ToolbarSelectedOptionConfigs): void {
    this.selectedOptions = options;

    if (this.selectedOptions.type) return;

    /**
     * 🟡 수정 예정 - 모든 객체 모델 완성 후
     * 변경 전 any
     * 변경 후 AnyObject
     */
    this.selectedObjects?.map((object: any, _: number) => {
      return object.setSelectionStyles({ fill: options.font.color }, object.pointer.start, object.pointer.end);
    });
  }

  /**
   * @event 추가 - Canvas안에 객체(텍스트, 이미지, 비디오 등)을 추가 이벤트
   */
  public onAddObject(object: CanvasObject) {
    return this.add(object);
  }

  /**
   * @event 삭제 - 선택한 객체 삭제 이벤트
   */
  public onDeleteSelectedObjects(): void {
    return this.selectedObjects?.forEach((object, _) => this.remove(object));
  }
  /**
   * @event 취소및해제 - 캔버스 취소 및 해제 이벤트
   */
  public onDismissCanvas() {
    this.clear();
    this.dispose();
  }

  /**
   * @event 재실행 - Canvas 전체 Re-Rendering 이벤트
   */
  public onRenderAll() {
    this.requestRenderAll();
  }

  /**
   * @event 설정 - 추출하길 원하는 객체의 인스턴스값을 위한 Config 설정 이벤트
   */
  public onSettingConfig(config = {}) {
    const { textObjectConfigs, imageObjectConfig, videoObjectConfig } = config as ObjectConfigs;
    const objectConfigState = new ObjectConfigState<T, I, V>({ ...config });

    if (!objectConfigState) return (this.configs = null);

    return (this.configs = objectConfigState!);
  }

  /**
   * @event 생성 - Canvas를 통하여 객체 생성 이벤트
   * @param type - 어떤 객체를 불러올지에대한 Key에 해당한다.
   * @param value - text, textBox일 경우 글자에 들어갈 내용, image, video일 경우 url에 해당한다.
   * @param options - 객체의 추가적으로 들어갈 option값에 해당한다.

   */
  public onCreateObject(type: "rect" | "circle" | "text" | "textBox" | "image" | "video", value: string, options = {}): object | null | undefined {
    if (type === "text") return this.create_text(value, options);
    else if (type === "textBox") return this.create_textBox(value, options);
    else if (type === "image") return null;
    else if (type === "circle") return null;
    else if (type === "rect") return null;
    else if (type === "video") return null;
  }

  /**
   * @event 그리기 - 배경 그리기 이벤트
   */
  public onDrawBackground() {
    const elements = document.getElementsByClassName("upper-canvas");

    if (elements.length > 0) {
      const canvas = elements[0] as HTMLCanvasElement;

      const lowerCanvas = new GridLayout({
        width: 1100,
        height: 700,
        canvas: canvas,
        theme: "dark",
      });

      lowerCanvas.onDrawBackground({ lineWidth: 0.3 });

      /** 수평선 이동 */
      lowerCanvas.onDrawHorizon();
      /** 선 그리기 */
      lowerCanvas.onDrawLine({ width: 1, color: "gray" });
      /** 수직선 이동 */
      lowerCanvas.onDrawVertical();

      /** 수평선 간격 그리기 */
      lowerCanvas.onDrawHorizonInterval();
      /** 그리기 종료 */
      lowerCanvas.onDrawDone({ isStart: true, isRestore: false });

      /** 수직선 간격 그리기 */
      lowerCanvas.onDrawVerticalInterval();
      /** 그리기 종료 */
      lowerCanvas.onDrawDone({ isStart: false, isRestore: true });
    }
  }

  /**
   * ========================================================================================
   *                                    Private Methods
   * ========================================================================================
   */

  /**
   * @description 텍스트 객체 생성
   */
  private create_text(text: string, options = {}): object | null {
    if (!this.context) return null;
    return new TextModel(text, options);
  }

  /**
   * @description 텍스트 박스 객체 생성
   */
  private create_textBox(text: string, options = {}): object | null {
    if (!this.context) return null;

    console.log("🟡\t Toolbar's option at.CanvasModel : ", options);

    const { fontSize, fontFamily, fill, underline, backgroundColor, ...rest } = options as { [key: string]: unknown };

    const newTextBox = new TextBoxModel(text, options);

    const textArray = newTextBox._text;

    newTextBox.setSelectionStyles({ fontSize, fontFamily, fill, underline, backgroundColor }, 0, textArray.length);

    return newTextBox;
  }

  /**
   * @description 이미지 객체 생성
   */
  private create_image(url: string, options = {}): object | null {
    if (!this.context) return null;
    return new ImageModel(url, options);
  }

  /**
   * @description 비디오 객체 생성
   */
  private create_video(url: string, options = {}): object | null {
    if (!this.context) return null;
    return new VideoModel(url, options);
  }

  /**
   * @description 캔버스로부터 모든 객체 가져오기
   */
  private get_object_from_canvas(type?: string): Object[] {
    return this.getObjects(type) || [];
  }

  /**
   * @description 캔버스로부터 선택한 객체 가져오기
   */
  private get_selected_objects(objects: ObjectList) {
    if (!objects) return (this.selectedObjects = null);
    this.selectedObjects = objects;
  }
}
