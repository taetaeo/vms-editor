import { useContext } from "react";
import { FormContext } from "@/contexts";

export default function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw "value is not provided";
  }

  return context;
}
