import type { PropsWithChildren } from "react";
//
import { FormContext } from "../contexts";
import { use_form_controller } from "../controllers";

type Props = {
  data?: unknown;
  loading?: boolean;
  error?: Error | null;
};

const FormProvider = ({ data, loading = false, error = null, children }: PropsWithChildren<Props>) => {
  const formControllerVO = use_form_controller<Props>({ data, loading, error });
  return <FormContext.Provider value={{ loading, error, ...formControllerVO }}>{children}</FormContext.Provider>;
};
export default FormProvider;
