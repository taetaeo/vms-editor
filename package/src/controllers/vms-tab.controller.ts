import * as React from "react";

export default function useVmsTabController() {
  const [tab, setTab] = React.useState<boolean>(false);

  const toggle = () => setTab((prev) => !prev);

  return { tab, toggle } as const;
}
