import * as React from "react";

import type { VmsConfigs } from "../../configs";
import { useFormToolbarController } from "../../controllers";
import { VmsContext } from "../contexts";

type Props = { vmsConfigs?: VmsConfigs };

const VmsProvider: React.FC<React.PropsWithChildren<Props>> = ({ vmsConfigs = undefined, children }) => {
  // Controller
  const { formToolbarState, toolbarEventHandler } = useFormToolbarController<VmsConfigs>(vmsConfigs!);

  return <VmsContext.Provider value={{ formToolbarState, toolbarEventHandler }}>{children}</VmsContext.Provider>;
};

export default VmsProvider;
