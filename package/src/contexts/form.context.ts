import { createContext } from "react";
import { VmsStateType } from "@/controllers/form.controller";
import { VmsFormObjectDTO } from "@/dto";

export type FormContextType = {
  // From Props
  loading?: boolean;
  error?: Error | null;

  // From Controller
  vmsFormData?: VmsStateType["formData"];
  vmsFormObjectList?: VmsStateType["objects"];
  selectedData?: VmsFormObjectDTO;
  onchangeSelectedData: (value: unknown) => void;
};

const FormContext = createContext<FormContextType>({
  loading: false,
  error: null,

  vmsFormData: undefined,
  vmsFormObjectList: undefined,
  selectedData: undefined,
  onchangeSelectedData: () => {},
});
export default FormContext;
