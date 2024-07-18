import * as React from "react";

export type VmsTabContextType = { tab?: boolean; toggle?: () => void };

export default React.createContext<VmsTabContextType>({ tab: false, toggle: () => {} });
