import { useContext } from "react";

import { FormContext } from "../../components/contexts";

export default function useFormCtxHandler() {
  const context = useContext(FormContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
