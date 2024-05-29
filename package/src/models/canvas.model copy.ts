import { fabric } from "fabric";
import { CanvasConfigs } from "@/app/configs/canvas.config";
import { InputObject, ObjectType } from "@/app/types";
import { LowerCanvasModel, TextBoxModel, TextModel, ImageModel, VideoModel, UtilsModel, ObjectConfigModel } from "@/models";

type CallbackFunction = (objects?: InputObject) => void;

type Parameters = {
  current: HTMLCanvasElement;
  configs: CanvasConfigs;
  selectedUpdatedFn: CallbackFunction;
};

type CanvasObject = fabric.Object;

// type ObjectType = TextModel | TextBoxModel;

export default class CanvasModel extends fabric.Canvas {
  public needObjectList: unknown[];
  public context: CanvasRenderingContext2D | null;
  public utils?: UtilsModel; // Utils 모듈
  public selectedObjects?: InputObject;

  private configs?: ObjectConfigModel<any, any, any> | null;

  // public objectList?: ObjectType[];

  /**
   * ============================================
   *           instances [2D Models]
   * ============================================
   */

  private newObject?: TextModel | TextBoxModel;

  constructor(params: Parameters) {
    super(params.current, params.configs);
    this.context = null;
    this.needObjectList = [];
    this.utils = new UtilsModel();
    this.configs = null;

    this.on("selection:created", ({ e, selected }) => {
      console.log("\t\t selection:created : ", { e, selected });

      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as InputObject);

      this.getSelectedObjects(selected! as InputObject);
    });

    this.on("object:selected", function (e) {
      // console.log("\t\t object:selected :", e);
    });

    this.on("selection:updated", ({ deselected, e, selected }) => {
      console.log("\t\t selection:updated :", selected);

      /** 선택한 객체가 없을 경우 */
      if (this.utils?.isEmptyArray(selected!)) return null;
      params?.selectedUpdatedFn(selected! as InputObject);

      this.getSelectedObjects(selected! as InputObject);
      return selected;
    });

    this.on("mouseup", (e) => {
      // console.log("\t\t mouseup :", e);
    });

    this.on("mouse:down", function (e) {
      // console.log("\t\t mouse:down :", e);
    });

    this.on("mouse:up:before", function (e) {
      // console.log("\t\t mouse:up:before :", e);
    });

    this.on("mousedblclick", function (e) {
      // console.log("\t\t mousedblclick :", e);
    });
  }

  /**
   * ============================================
   *           public Methods [Canvas]
   * ============================================
   */

  /**
   * @description 캔버스의 Context 호출하기
   */
  public getCanvasContext() {
    this.context = this.getContext();
    return this.context;
  }

  /**
   * @description 캔버스에 객체 추가
   * @param {CanvasObject} object
   */
  public onAddObject(object: CanvasObject) {
    return this.add(object);
  }

  /**
   * @description 캔버스 삭제
   */
  public onDismissCanvas() {
    this.clear();
    this.dispose();
  }

  /**
   * @description 캔버스 전체 랜더링
   */
  public onRenderAll() {
    this.requestRenderAll();
  }

  public onSettingConfig<T, I, V>(config = {}) {
    const { textConfig, imageConfig, videoConfig } = config as any;
    return (this.configs = new ObjectConfigModel<T, I, V>({
      textConfig,
      imageConfig,
      videoConfig,
    }));
  }

  public onGetObjects<T extends object, I extends object, V extends object>() {
    const rawDataList = this.getObjectFromCanvas();

    /** 예외 1. 빈 배열일 경우  */
    if (this.utils?.isEmptyArray(rawDataList)) return;

    /** 스택구조를 활용하여 데이터 정제 */
    while (!this.utils?.isEmptyArray(rawDataList)) {
      // 1. 객체에서 가져오기 POP
      const poppedObject = rawDataList.pop(); // 2. POP된 객체 선언

      // 3. 객체 유형 파악

      //  1) 텍스트 박스 객체
      if (this.utils?.whatInstance(poppedObject, TextBoxModel)) {
        // 4. 가지고 오고자 하는 값 가져오기
        const needToKnowData = poppedObject.getObjectData<T, TextBoxModel>(this.configs?.textConfig);

        // 5. 정제된 배열에 넣기 - 중복된 ID를 가진 요소를 찾아서 최신 값으로 덮어씌움
        const foundIndex = this.utils.getUniqueElement(this.needObjectList, needToKnowData?.objectId);
        if (foundIndex !== -1) {
          this.needObjectList[foundIndex] = needToKnowData;
        } else {
          this.needObjectList.push(needToKnowData);
        }
      }
      //  2) 텍스트 객체
      else if (this.utils?.whatInstance(poppedObject, TextModel)) return;
      //  3) 이미지 객체
      else if (this.utils?.whatInstance(poppedObject, ImageModel)) return;
      // 4) 비디오 객체
      else if (this.utils?.whatInstance(poppedObject, VideoModel)) return;
    }

    return this.needObjectList;
  }
  /**
   * ============================================
   *           Public Methods [Contexts]
   * ============================================
   */

  public onCreateObject(type: ObjectType, text: string, options = {}) {
    if (type === "text") return this.createTextBox(text, options);
    else if (type === "image") return null;
    else if (type === "circle") return null;
    else if (type === "rect") return null;
    else if (type === "video") return null;
  }

  public onDrawBackground() {
    const elements = document.getElementsByClassName("upper-canvas");

    if (elements.length > 0) {
      const canvas = elements[0] as HTMLCanvasElement;

      const lowerCanvas = new LowerCanvasModel({
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

  public getObjectsFromCanvas() {
    console.log("가지고있는 객체들", this._objects);
    return this._objects;
  }

  /**
   * ============================================
   *           Private Methods [Contexts]
   * ============================================
   */

  /**
   * 텍스트 객체 모델 생성
   * @param {string} text - 텍스트 내용
   * @param options
   * @returns {TextBoxModel | null}
   */

  private createText(text: string, options = {}): object | null {
    if (!this.context) return null;
    return new TextModel(text, options);
  }

  private createTextBox(text: string, options = {}): object | null {
    if (!this.context) return null;
    return new TextBoxModel(text, options);
  }

  private getObjectFromCanvas(): unknown[] {
    return this.getObjects() || [];
  }

  private getSelectedObjects(object: InputObject) {
    if (!object) return (this.selectedObjects = null);
    return (this.selectedObjects = object);
  }
}
