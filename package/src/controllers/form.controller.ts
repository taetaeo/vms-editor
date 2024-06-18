import { useEffect } from "react";
import { plainToClass } from "class-transformer";

// Functions
import { useCanvasContext, useMultiState } from "@/functions";
// DTO
import { VmsFormDTO, VmsFormObjectDTO } from "@/dto";
// lib
import { Utils } from "@/lib";
// Types
import { AnyModelType } from "@/types";
// Constants
import { FORM_SELECTOR_CONST_KEY } from "@/enums";

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

  // ----- Fetched Vms Form Data -----
  const [vmsForm, dispatchVmsForm] = useMultiState<VmsStateType>({
    formData: [],
    objects: [],
  });

  const _setVmsForm = (name: FORM_SELECTOR_CONST_KEY, value: unknown | unknown[]) => dispatchVmsForm({ name, value });
  // ----- Fetched Vms Form Data -----

  // ----- Selected Form Object Data -----
  const [data, dispatchData] = useMultiState<{ selectedData: VmsFormObjectDTO }>({
    selectedData: {},
  });

  const _setData = (name: FORM_SELECTOR_CONST_KEY, value: unknown) => dispatchData({ name, value });
  // ----- Selected Form Object Data -----

  const onchangeSelectedData = (value: unknown) => _setData(FORM_SELECTOR_CONST_KEY.SELECTED_DATA, value);

  useEffect(() => {
    const { data } = fetchData;

    if (data?.statusCode !== 200) return;

    const preparedData = plainToClass(VmsFormDTO, data.responseObject).data();
    const { objects, ...rest } = preparedData;
    const newObjects = objects.map((object: unknown) => plainToClass(VmsFormObjectDTO, object).data());

    console.log(newObjects);
    _setVmsForm(FORM_SELECTOR_CONST_KEY.FORM_DATA, rest);

    _setVmsForm(FORM_SELECTOR_CONST_KEY.OBJECTS, newObjects);
  }, [fetchData.data]);

  /**
   * @description 선택한 데이터가 달라질때, Active할 객체 변경
   */
  useEffect(() => {
    if (!canvas || utils.isEmptyObject(data.selectedData)) return;

    // 선택한 데이터의 아이디와 일치하는 경우에 대해서 필터
    const targetObjects = [...canvas.getAllObjects()].filter((object, _) => (object as keyAble).objectId === data.selectedData?._id);

    canvas.updateSelectedObjects(targetObjects as AnyModelType[]);
  }, [data]);

  return {
    selectedData: data.selectedData,
    vmsFormData: vmsForm.formData,
    vmsFormObjectList: vmsForm.objects,
    onchangeSelectedData,
  };
}
