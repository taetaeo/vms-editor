"use strict";
import { fabric } from "fabric";
import * as v4 from "uuid";

import { ObjectConfigs, ObjectConfigsImageObject, ObjectConfigsTextObject, ObjectConfigsVideoObject, type CanvasConfigs } from "../configs";
import { Utils } from "../lib";
import { ObjectConfigState } from "../states";
import { AnyModelType, AnyModelListType, ObjectVariant, SelectedImage, ToolbarSelectedOptionConfigs, Image } from "../types";
import { ImageModel, TextBoxModel, TextModel, VideoModel } from "../models";
import { GridLayout } from "../layouts";

type CallbackFunction = (objects?: AnyModelListType | null) => void;

type Parameters = {
  current: HTMLCanvasElement;
  configs: CanvasConfigs;
  selectedUpdatedFn: CallbackFunction;
};
export default class CanvasModel<T extends object, I extends object, V extends object> extends fabric.Canvas {
  public context: CanvasRenderingContext2D | null; // Canvas's context
  public selectedObjects?: AnyModelListType | null;
  public selectedImage?: SelectedImage;

  private needObjectList: unknown[]; // 데이터를 추출하고자 하는 객체 리스트
  private utils?: Utils; // 공통으로 사용할 함수
  private configs?: ObjectConfigState<T, I, V> | null;

  private selectedOptions?: ToolbarSelectedOptionConfigs;
  private callbackFn?: () => void;

  constructor(params: Parameters) {
    super(params.current, params.configs);
    this.context = null;

    this.needObjectList = [];
    this.utils = new Utils();
    this.configs = null;

    this.on("dragenter", (e) => {
      // Drag로 접근했을때
      // console.log("🟥 \t dragenter : ", this.selectedImage);
    });
    this.on("dragover", (e) => {
      // Drag로 위에 올라와있을 때
      // console.log("🟥 \t dragover : ", this.selectedImage);
    });
    this.on("dragleave", (e) => {
      // Drag가 사라졌을 때
      // console.log("🟥 \t dragleave : ", this.selectedImage);
    });
    this.on("drop:before", (e) => {
      // Drag가 끝나고 Drop을 시작하기 전
      // console.log("🟥 \t drop:before : ", this.selectedImage);
    });
    this.on("drop", async (e) => {
      // Drop 전단계가 끝나고 Drop이 완료되었을 때
      if (!this.selectedImage?.src) return;

      const src = this.selectedImage.src!;

      /**
       * @description 이미지 변환 처리를 위한 utils에서 ImageModel을 추가
       */
      this.utils
        ?.createImageFromUrl(src)
        ?.then((image) => {
          const imageModel = this.create_image(src, {
            objectId: v4(),
            image: image as fabric.Image,
          });

          if (!imageModel) return;

          this.add(imageModel); // 이미지 객체 모델 추가
        })
        .catch((error: Error) => {
          console.error("Error loading image: ", error); // 에러 발생시 에러 메시지
        })
        .finally(() => {
          this.requestRenderAll(); // 결과를 마친 후 다시 그리기
        });

      this.clear_selected_image();

      if (this.callbackFn && typeof this.callbackFn === "function") {
        this.callbackFn();
      }
      // console.log("🟥 \t drop : ", this.selectedImage);
    });

    this.on("selection:created", ({ e, selected }) => {
      console.log("🟥 \t selection:created : ", { e, selected });

      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as AnyModelListType);

      this.get_selected_objects(selected! as AnyModelListType);
    });

    this.on("object:selected", (e) => {
      console.log("🟥 \t object:selected :", e);
    });

    this.on("selection:updated", ({ deselected, e, selected }) => {
      console.log("🟥 \t selection:updated :", selected);

      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as AnyModelListType);

      this.get_selected_objects(selected! as AnyModelListType);
    });

    this.on("mouseup", (e) => {
      // console.log("🟥 \t mouseup :", e);
      // this.selectedObjects = e.target;
    });

    this.on("mouse:down", (e) => {
      // console.log("🟥 \t mouse:down :", e);
      // 아무런 객체가 없을 경우
      if (!e.target) {
        return (this.selectedObjects = undefined);
      }
      const selectedObject = e.target;

      // console.log("🟥 \t 객체가 있습니다. : ", selectedObject);

      return (this.selectedObjects = [selectedObject]);
    });
    this.on("after:render", (e) => {
      // console.log("🟦🟥🟫🟩🟨🟩 \t after:render :", e);
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
   * @event GET - Canvas내에 있는 객체들 전부 가져오는 이벤트
   */

  public getAllObjects() {
    return this._objects;
  }

  /**
   * @event GET - Canvas에 있는 객체들 중, Config에따라 필요한 데이터만 추출
   */
  public getObjectFromConfigs(): AnyModelListType | null {
    // 데이터 리스트 얕은 복사
    const rawDataList = [...this.getAllObjects()];

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
      } // 3-5. Kclass 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, fabric.Image)) {
        const { objectId, width, height, aCoords, fill, ...rest } = poppedObject as { [key in string]: any };

        const cheangedKclass = { objectId, width, height, aCoords, fill };

        const foundIndex = this.utils.getUniqueElement(this.needObjectList, cheangedKclass?.objectId);
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = cheangedKclass;
        } else {
          this.needObjectList.push(cheangedKclass);
        }
      }
    }
    return this.needObjectList as AnyModelListType;
  }

  /**
   * @event GET - 선택한 이미지 객체 가져오기
   */
  public getSelectedImage(src: string, alt: string, callbackFn: () => void): void | null {
    const draggedImage: Image = { src, alt };

    console.log("🟫🟩🟨🟩🟢🔵🟣🟤 \t 드래그중인 이미지 객체", draggedImage);
    if (!draggedImage.src) return null;
    const snapshot = { ...this.selectedImage, ...draggedImage };
    this.selectedImage = snapshot;
    this.callbackFn = callbackFn;
  }

  /**
   * @event 변경 - Toolbar에서 선택한 옵션 값의 변경 이벤트
   * */
  public onChangeConfigsOption(options: ToolbarSelectedOptionConfigs): void {
    this.selectedOptions = options;

    if (this.selectedOptions.type) return;

    /**
     * @event 업데이트 - 객체 모델의 스타일을 업데이트하는 이벤트
     */
    this.selectedObjects?.map((object: any, _: number) => {
      return object.setSelectionStyles({ fill: options.font.color }, object.pointer.start, object.pointer.end);
    });
  }

  public onChangeActive(object: AnyModelType) {
    if (this.utils?.isEmptyObject(object)) return;
    this.setActiveObject(object);
    this.renderAll();
  }

  /**
   * @event 업데이트 - 선택한 객체 리스트 변경
   */
  public onChangeSelectedObject(object: AnyModelType[], { isActive = false }) {
    this.selectedObjects = object;

    if (!isActive) return;

    this.selectedObjects.forEach((object) => {
      this.setActiveObject(object);
    });
    this.renderAll();
  }

  /**
   * @event 추가 - Canvas안에 객체(텍스트, 이미지, 비디오 등)을 추가 이벤트
   * @param {AnyModelType} object - 객체 모델로서, Text, Image, Video Model 등
   */
  public onAddObject(object: AnyModelType) {
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
    const { textObjectConfig, imageObjectConfig, videoObjectConfig } = config as ObjectConfigs;
    const objectConfigState = new ObjectConfigState<ObjectConfigsTextObject, ObjectConfigsImageObject, ObjectConfigsVideoObject>({
      textObjectConfig,
      imageObjectConfig,
      videoObjectConfig,
    });

    if (!objectConfigState) return (this.configs = null);

    return (this.configs = objectConfigState as any);
  }

  /**
   * @event 생성 - Canvas를 통하여 객체 생성 이벤트
   * @param type - 어떤 객체를 불러올지에대한 Key에 해당한다.
   * @param value - text, textBox일 경우 글자에 들어갈 내용, image, video일 경우 url에 해당한다.
   * @param options - 객체의 추가적으로 들어갈 option값에 해당한다.

   */
  public onCreateObject(type: ObjectVariant, value: string, options: any = {}): object | null | undefined | void {
    if (type === "text") return this.create_text(value, options);
    else if (type === "textBox") return this.create_textBox(value, options);
    else if (type === "image") return null;
    else if (type === "pict") return this.create_image(value, options);
    else if (type === "video") return this.utils?.isClickCurrent(options.current);
    else if (type === "circle") return null;
    else if (type === "rect") return null;
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
   * @event 추가 - 비디오 추가하기 이벤트
   */

  public onUploadVideoElement(videoElement: HTMLVideoElement, option = {}) {
    return this.create_video(videoElement, option);
  }

  public onRequestAnimFrame() {
    fabric.util?.requestAnimFrame(this.onRequestAnimFrame);
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

    const { fontSize, fontFamily, fill, underline, backgroundColor, ...rest } = options as { [key: string]: unknown };

    const newTextBox = new TextBoxModel(text, options);

    const textArray = newTextBox._text;

    newTextBox.setSelectionStyles({ fontSize, fontFamily, fill, underline, backgroundColor }, 0, textArray.length);

    return newTextBox;
  }

  /**
   * @description 이미지 객체 생성
   */
  private create_image(url: string, options = {}): ImageModel | null {
    if (!this.context) return null;
    return new ImageModel(url, options);
  }

  /**
   * @description 비디오 객체 생성
   */
  private create_video(element: HTMLVideoElement, options = {}): VideoModel | null {
    if (!this.context) return null;
    return new VideoModel(element, options);
  }

  /**
   * @description 캔버스로부터 모든 객체 가져오기
   */
  private get_object_from_canvas(type?: string): unknown[] | [] {
    return this.getObjects(type) || [];
  }

  /**
   * @description 캔버스로부터 선택한 객체 가져오기
   */
  private get_selected_objects(objects: AnyModelListType) {
    if (!objects.length) return (this.selectedObjects = null);
    this.selectedObjects = objects;
  }

  /**
   * @description 선택한 이미지 객체 비우기
   */
  private clear_selected_image() {
    this.selectedImage = { src: "", alt: "", createdAt: "" };
  }
}
