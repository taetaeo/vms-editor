import * as React from "react";

import type { DefaultFetchData } from "../../types";
import type { VmsStateType } from "../../controllers";
import { VmsFormObjectDTO } from "../../shared/dto";

type VmsFormObjectState = { vmsFormData?: VmsStateType["formData"]; vmsFormObjectList?: VmsStateType["objects"] };

type VmsFormSelectState = { selectedData?: VmsFormObjectDTO; onchangeSelectedData: (value: unknown) => void };

export type FormContextType = DefaultFetchData & VmsFormObjectState & VmsFormSelectState;

const defaultFetchState = { loading: false, error: null } as DefaultFetchData;

const defaultVmsFormState = { vmsFormData: undefined, vmsFormObjectList: undefined };

const defaultFormSelectState = { selectedData: undefined, onchangeSelectedData: () => {} };

export default React.createContext<FormContextType>({ ...defaultFetchState, ...defaultVmsFormState, ...defaultFormSelectState });
