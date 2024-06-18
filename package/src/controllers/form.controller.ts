import { useEffect } from "react";
import { plainToClass } from "class-transformer";

import { useCanvasContext, useMultiState } from "@/functions";

import { FORM_SELECTOR_CONST_KEY } from "@/enums";
import { VmsFormDTO, VmsFormObjectDTO } from "@/dto";
import { Utils } from "@/lib";
import { AnyModelType, AnyObjectType } from "@/types";

type FormControllerProps = {
  data?: any;
  loading: boolean;
  error: Error | null;
};

export interface VmsStateType {
  formData: VmsFormDTO[];
  objects: VmsFormObjectDTO[];
}
const utils = new Utils();

export default function useFormController<T>(fetchData: FormControllerProps) {
  const { canvas, setCanvas } = useCanvasContext();

  // Fetched Form Data
  const [vmsForm, dispatchVmsForm] = useMultiState<VmsStateType>({
    formData: [],
    objects: [],
  });

  const set_vms_form = (name: FORM_SELECTOR_CONST_KEY, value: unknown | unknown[]) => dispatchVmsForm({ name, value });

  // Selected Form Object Data
  const [data, dispatchData] = useMultiState<{ selectedData: VmsFormObjectDTO }>({
    selectedData: {},
  });

  const set_data = (name: FORM_SELECTOR_CONST_KEY, value: unknown) => dispatchData({ name, value });

  const onchangeSelectedData = (value: unknown) => set_data(FORM_SELECTOR_CONST_KEY.SELECTED_DATA, value);

  useEffect(() => {
    const { data } = fetchData;

    if (data?.statusCode !== 200) return;

    const preparedData = plainToClass(VmsFormDTO, data.responseObject).data();
    const { objects, ...rest } = preparedData;
    const newObjects = objects.map((object: unknown) => plainToClass(VmsFormObjectDTO, object).data());

    set_vms_form(FORM_SELECTOR_CONST_KEY.FORM_DATA, rest);

    set_vms_form(FORM_SELECTOR_CONST_KEY.OBJECTS, newObjects);
  }, [fetchData.data]);

  // useEffect(() => {
  //   if (vmsForm.objects && canvas) {
  //     vmsForm.objects?.map((data, _) => {
  //       const objectModel = canvas.onCreateObject("textBox", data.style.dsplTxt || "", {
  //         id: data._id,
  //         width: data.w,
  //         height: data.h,
  //         fill: data.style.fontClr,
  //         left: data.coordX,
  //         top: data.coordY,
  //         fontSize: data.style.fontSz,
  //       });
  //       canvas.add(objectModel as AnyModelType);
  //       // console.log("form 전", canvas._objects);
  //       setCanvas(canvas);
  //       // console.log("form 후", canvas._objects);
  //     });
  //     // canvas.renderAll();
  //   }
  // }, [vmsForm.objects]);

  /**
   * @description 선택한 데이터가 달라질때, Active할 객체 변경
   */
  useEffect(() => {
    if (!canvas || utils.isEmptyObject(data.selectedData)) return;

    const { selectedData } = data;

    console.log(data);

    // 선택한 데이터의 아이디와 일치하는 경우에 대해서 필터
    const targetObjects = canvas.getAllObjects().filter((object: AnyObjectType<any>, _) => object.id === selectedData?._id);

    canvas.onChangeSelectedObject(targetObjects as AnyModelType[], { isActive: true });
  }, [data]);

  return {
    selectedData: data.selectedData,
    vmsFormData: vmsForm.formData,
    vmsFormObjectList: vmsForm.objects,
    onchangeSelectedData,
  };
}
