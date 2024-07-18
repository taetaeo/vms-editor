import type { PropsWithChildren } from "react";
//
import type { DefaultFetchData } from "../../types";
import { useFormController } from "../../controllers";
import { FormContext } from "../contexts";

type Props = DefaultFetchData;

const FormProvider = ({ data, loading = false, error = null, children }: PropsWithChildren<Props>) => {
  // Controller
  const formControllerVO = useFormController<Props>({ data, loading, error });

  return <FormContext.Provider value={{ loading, error, ...formControllerVO }}>{children}</FormContext.Provider>;
};
export default FormProvider;
