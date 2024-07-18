import * as React from "react";

import { useVmsTabController } from "../../controllers";
import { VmsTabContext } from "../contexts";

type Props = {};

const VideoProvider: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const tabController = useVmsTabController();
  return <VmsTabContext.Provider value={tabController}>{children}</VmsTabContext.Provider>;
};

export default VideoProvider;
