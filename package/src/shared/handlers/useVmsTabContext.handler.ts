import { useContext } from "react";
//
import { VmsTabContext } from "../../components/contexts";

export default function useVmsTabCtxHandler() {
  const context = useContext(VmsTabContext);

  if (!context) {
    throw "canvas context is not provided...";
  }
  return context;
}
