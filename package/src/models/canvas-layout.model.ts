"use strict";
import { fabric } from "fabric";
import uuid from "react-uuid";

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
  public error: Error | null;

  public history: any;
  public historyStep: number = 0;
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
    this.error = null;

    this.needObjectList = [];
    this.utils = new Utils();
    this.configs = null;

    /**
     * @event Drag - Canvas로 Drag된 요소가 접근했을때
     */
    this.on("dragenter", (e) => {
      // console.log("🟥 \t dragenter : ", this.selectedImage);
    });
    /**
     * @event Drag - Canvas로 Drag된 요소가 위에 올라와있을 때
     */
    this.on("dragover", (e) => {
      // console.log("🟥 \t dragover : ", this.selectedImage);
    });
    /**
     * @event Drag - 요소가 사라졌을 때
     */
    this.on("dragleave", (e) => {
      // console.log("🟥 \t dragleave : ", this.selectedImage);
    });
    /**
     * @event Drag - Drag 이벤트가 끝나고 Drop을 시작하기 전 실행
     */
    this.on("drop:before", (e) => {
      // console.log("🟥 \t drop:before : ", this.selectedImage);
    });
    /**
     * @event Drop 전단계가 끝나고 Drop이 완료되었을 때 실행
     */
    this.on("drop", async (e) => {
      // Check point 1. 선택한 이미지의 src가 있는지 확인한다.
      if (!this.selectedImage?.src) {
        return;
      }

      // 이미지 객체 모델 생성
      this._createImageModel(this.selectedImage.src!, { objectId: uuid() });

      // 선택한 이미지 비우기
      this._clearSelectedImage();

      // 콜백이 있을 경우 실행
      if (this.callbackFn && typeof this.callbackFn === "function") {
        this.callbackFn();
      }
    });

    /**
     * @event selection:created 그룹이 생성되었을때
     */
    this.on("selection:created", ({ e, selected }) => {
      // console.log("🟥 \t selection:created : ", { e, selected });

      // Check Point 1. 그룹의 요소가 비어있는지 확인
      if (this.utils?.isEmptyArray(selected!)) {
        return null;
      }
      // Callback 을 실행
      params?.selectedUpdatedFn(selected! as AnyModelListType);

      this._updateSelectedObjects(selected! as AnyModelListType);
    });

    this.on("object:selected", (e) => {
      console.log("🟥 \t object:selected :", e);
    });

    /**
     * @event selection:updated 그룹의 요소가 변경되었을때
     */
    this.on("selection:updated", ({ deselected, e, selected }) => {
      console.log("🟥 \t selection:updated :", selected);

      // Check Point 1. 그룹의 요소가 비어있는지 확인
      if (this.utils?.isEmptyArray(selected!)) {
        return null;
      }

      // selected된 객체들을 Callback을 통해 보내기
      params?.selectedUpdatedFn(selected! as AnyModelListType);

      //
      this._updateSelectedObjects(selected! as AnyModelListType);
    });

    /**
     * @event mouseup 마우스가 올라왔을때
     */
    this.on("mouseup", (e) => {
      // console.log("🟥 \t mouseup :", e);
      // this.selectedObjects = e.target;
    });
    /**
     * @event mouse:down 마우스의 클릭이 내려왔을때
     */
    this.on("mouse:down", (e) => {
      // console.log("🟥 \t mouse:down :", e);

      // Check Point 1. 객체가 있는지 확인
      if (!e.target) {
        // 선택한 객체정보 초기화
        return (this.selectedObjects = null);
      }

      // console.log("🟥 \t 객체가 있습니다. : ", selectedObject);

      return (this.selectedObjects = Array(e.target));
    });
    /**
     * @event after:render 렌더링이 끝난 시점
     */
    this.on("after:render", (e) => {
      // console.log("🟦🟥🟫🟩🟨🟩 \t after:render :", e);
    });
  }

  /**
   * ====================================================================
   *                           public Methods
   *
   * 규칙 : 알파벳 순으로 배치
   * 1. add : 데이터를 추가
   * 2. clear : 데이터를 초기화 및 삭제
   * 3. create : 데이터를 생성
   * 4. delete : 데이터를 삭제하기
   * 5. draw : 레이아웃 그리기
   * 6. get : 데이터를 가져오기
   * 7. update : 데이터를 갱신하기
   * 8. un- : 이벤트 취소
   * ====================================================================
   */

  /**
   * @event 추가 - Canvas안에 객체(텍스트, 이미지, 비디오 등)을 추가 이벤트
   * @param {AnyModelType} object - 객체 모델로서, Text, Image, Video Model 등
   */
  public addModel(object: AnyModelType) {
    return this.add(object);
  }

  /**
   * @event 취소및해제 - 캔버스 취소 및 해제 이벤트
   */
  public clearCanvas() {
    this.clear();
    this.dispose();
  }

  /**
   * @event 생성 - Canvas를 통하여 객체 생성 이벤트
   * @param {ObjectVariant} type - 어떤 객체를 불러올지에대한 Key에 해당한다.
   * @param {string} value - text, textBox일 경우 글자에 들어갈 내용, image, video일 경우 url에 해당한다.
   * @param {keyAble} options - 객체의 추가적으로 들어갈 option값에 해당한다.

   */
  public createObjectByType(type: ObjectVariant, value: string, options: keyAble = {}): object | null | void {
    switch (type) {
      case "text":
        return this._createTextModel(value, options);
      case "textBox":
        return this._createTextBoxModel(value, options);
      case "image":
        return null;
      case "video":
        return this.utils?.isClickCurrent(options.current);
      case "circle":
        return null;
      case "rect":
        return null;
      default:
        console.warn(`Unsupported object type: ${type}`);
        return;
    }
  }

  /**
   * @event 추가 - 비디오 추가하기 이벤트
   */

  public createVideoModelByElement(videoElement: HTMLVideoElement, option = {}) {
    return this._createVideoModel(videoElement, option);
  }

  /**
   * @event 삭제 - 선택한 객체 삭제 이벤트
   */
  public deleteSelectedObjects(): void {
    // 선택된 객체가 없거나 빈 배열인 경우 경고 메시지를 출력하고 함수를 종료
    if (!this.selectedObjects || this.selectedObjects.length === 0) {
      console.warn("삭제할 객체가 선택되지 않았습니다");
      return;
    }

    // 각 선택된 객체를 캔버스에서 제거
    this.selectedObjects?.forEach((object, _) => this.remove(object));

    // 캔버스를 다시 렌더링
    this.requestRenderAll();
  }

  /**
   * @event 그리기 - 배경 그리기 이벤트
   */
  public drawBackground() {
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
  public getObjectMatchingConfigs(): AnyModelListType | null {
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

        const foundIndex = this.utils.findIndexById(this.needObjectList as keyAble[], needToKnowData?.objectId, "objectId");

        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-2. 텍스트 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, TextModel)) {
        const needToKnowData = poppedObject.getObjectData<T, TextModel>(this.configs?.textObjectConfig);
        const foundIndex = this.utils.findIndexById(this.needObjectList as keyAble[], needToKnowData?.objectId, "objectId");
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-3. 이미지 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, ImageModel)) {
        const needToKnowData = poppedObject.getObjectData<I, ImageModel>(this.configs?.imageObjectConfig);
        const foundIndex = this.utils.findIndexById(this.needObjectList as keyAble[], needToKnowData?.objectId, "objectId");
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      // 3-4 비디오 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, VideoModel)) {
        const needToKnowData = poppedObject.getObjectData<V, VideoModel>(this.configs?.videoObjectConfig);
        const foundIndex = this.utils.findIndexById(this.needObjectList as keyAble[], needToKnowData?.objectId, "objectId");
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      } // 3-5. Kclass 객체 가져오기
      else if (this.utils?.whatInstance(poppedObject, fabric.Image)) {
        const { objectId, width, height, aCoords, fill, ...rest } = poppedObject as { [key in string]: any };

        const cheangedKclass = { objectId, width, height, aCoords, fill };

        const foundIndex = this.utils.findIndexById(this.needObjectList as keyAble[], cheangedKclass?.objectId, "objectId");
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
  public updateConfigsOption(options: ToolbarSelectedOptionConfigs): void {
    this.selectedOptions = options; // 선택된 옵션을 갱신

    // check point 1. type 속성이 있는지 확인
    if (!this.selectedOptions.type) {
      return;
    }

    // 선택된 객체들을 순회하면서 스타일을 적용
    this.selectedObjects?.forEach((object: any, _: number) => {
      // 선택 옵션의 폰트 색상을 객체의 선택 영역에 적용합니다.
      object.setSelectionStyles({ fill: options.font.color }, object.pointer.start, object.pointer.end);
    });
  }

  /**
   * @event 업데이트 - 선택한 객체 리스트 변경
   * @description 선택된 객체들을 변경하고 캔버스에서 활성 객체로 설정합니다.
   * @param {AnyModelType[]} objects - 선택할 객체들의 배열.
   */
  public updateSelectedObjects(objects: AnyModelType[]) {
    this.selectedObjects = objects; // 선택된 객체들을 설정

    // check point 1. 선택된 객체 배열이 정의되어 있고 실제 배열인지 확인
    if (!this.selectedObjects || !Array.isArray(this.selectedObjects)) {
      console.warn("잘못된 객체가 제공되었습니다. 정의된 데이터 타입이 아닙니다.");
      return;
    }

    // check point 2. 선택된 객체 배열이 비어있는지 확인
    if (this.selectedObjects.length === 0) {
      console.warn("선택된 객체가 없습니다.");
      return;
    }

    this._updateActiveObjects(this.selectedObjects);
  }

  /**
   * @event 설정 - 추출하길 원하는 객체의 인스턴스값을 위한 Config 설정 이벤트
   */
  public updateEditorConfig(config = {}) {
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
   * @event 취소 앞 동작의 실행 취소
   */
  public undo(): void | null {
    // Check Point 1. Context가 있는지 확인
    if (!this.context) return null;
  }

  /**
   * ========================================================================================
   *                                    Private Methods
   *
   * 규칙 1) private 내장 메서드는 _ 를 붙임으로써 public 메서드와 구분됩니다.
   * 규칙 2) 알파벳 순으로 배치
   *
   * 1. _clear : 데이터를 초기화
   * 2. _create : 데이터를 생성하기
   * 3. _delete : 데이터를 삭제하기
   * 4. _get : 데이터를 가져오기
   * 5. _update : 데이터를 갱신하기
   * ========================================================================================
   */

  /**
   * @description 선택한 이미지 객체 비우기
   */
  private _clearSelectedImage() {
    this.selectedImage = { src: "", alt: "", createdAt: "" };
  }

  /**
   * @description 텍스트 객체 모델 생성
   */
  private _createTextModel(text: string, options = {}): object | null {
    // Check Point 1. Context가 있는지 확인
    if (!this.context) return null;

    return new TextModel(text, options);
  }

  /**
   * @description 텍스트 박스 객체 모델 생성
   */
  private _createTextBoxModel(text: string, options = {}): object | null {
    // Check Point 1. Context가 있는지 확인
    if (!this.context) return null;

    const { fontSize, fontFamily, fill, underline, backgroundColor, ...rest } = options as { [key: string]: unknown };

    const newTextBox = new TextBoxModel(text, options);

    const textArray = newTextBox._text;

    newTextBox.setSelectionStyles({ fontSize, fontFamily, fill, underline, backgroundColor }, 0, textArray.length);

    return newTextBox;
  }

  /**
   * @description 이미지 객체 모델 생성, 이미지 변환 처리를 위한 utils에서 ImageModel을 추가
   */
  private _createImageModel(src: string, options = {}) {
    // Check point 1. Context가 없거나 또는 src가 없는 경우
    if (!this.context || !src) return null;

    return this.utils
      ?.onLoadImageFromUrl(src!)
      ?.then((image) => {
        const imageModel = new ImageModel(src, {
          image: image as fabric.Image,
          ...options,
        });
        // Check point 2. 이미지 모델을 만들 수 없을 경우
        if (!imageModel) {
          return;
        }
        this.add(imageModel); // 이미지 객체 모델 추가
      })
      .catch((error: Error) => {
        this.error = error;
        console.error("Error loading image: ", error); // 에러 발생시 에러 메시지
      })
      .finally(() => {
        this.requestRenderAll(); // 결과를 마친 후 다시 그리기
      });
  }

  /**
   * @description 비디오 객체 모델 생성
   */
  private _createVideoModel(element: HTMLVideoElement, options = {}): VideoModel | null {
    // Check Point 1. Context가 있는지 확인
    if (!this.context) return null;

    return new VideoModel(element, options);
  }
  /**
   * @description 캔버스로부터 모든 객체 가져오기
   */
  private _getObjectsOfCanvas(type?: string): unknown[] | [] {
    return this.getObjects(type) || [];
  }
  /**
   * @description 선택된 객체를 순회하여 스타일을 변경
   * @param {AnyModelListType} objects
   */
  private _updateActiveObjects(objects: AnyModelListType) {
    try {
      // 각 선택된 객체를 순회
      for (const object of objects) {
        // 각 객체를 검증하여 객체인지와 'id' 속성을 가지고 있는지 확인
        if (!object || typeof object !== "object" || !("objectId" in object)) {
          console.error("선택된 객체 목록에 유효하지 않은 객체가 포함되어 있습니다:", object);
          continue;
        }

        this.setActiveObject(object); // 현재 객체를 활성 객체로 설정
      }
    } catch (error) {
      console.error("객체를 처리하는 중 오류 발생:", error); // 처리 중에 발생하는 모든 오류를 로그
    }

    this.renderAll(); // 변경 사항을 반영하기 위해 캔버스를 리렌더링
  }

  /**
   * @description 캔버스로부터 선택한 객체 모델 업데이트
   */
  private _updateSelectedObjects(objects: AnyModelListType | null): void {
    // Check Point 1. objects가 null이거나 배열이 아닌 경우 처리
    if (!Array.isArray(objects) || objects.length === 0) {
      this.selectedObjects = null;
      return;
    }

    // selectedObjects 업데이트
    this.selectedObjects = objects;
  }
}
