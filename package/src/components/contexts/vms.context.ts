import * as React from "react";

import type { IUseFormToolbarController } from "../../controllers";

type ToolbarEventHandler = { colorChange: (color: string) => void; timeChange: (time: number) => void };

export type VmsContextType = { formToolbarState?: IUseFormToolbarController; toolbarEventHandler?: ToolbarEventHandler };

export default React.createContext<VmsContextType>({ formToolbarState: undefined, toolbarEventHandler: undefined });
