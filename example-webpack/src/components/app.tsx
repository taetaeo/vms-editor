import React, { ReactNode } from "react";

import { objectConfigs, CanvasModel, toolbarConfigs } from "vms-editor";
import { ToolbarProvider, EditorProvider } from "vms-editor";

import VmsContainer from "./vms/vms-container";

const App = (): ReactNode => {
  const [canvas, setCanvas] = React.useState<CanvasModel<any, any, any> | null>(null); // canvas 상태 추가

  return (
    <>
      {/* Toolbar Configs */}
      <ToolbarProvider toolbarUiConfig={toolbarConfigs}>
        <EditorProvider editorConfigs={objectConfigs}>
          <VmsContainer canvas={canvas!} setCanvas={setCanvas} />
        </EditorProvider>
      </ToolbarProvider>
      {/* Toolbar Configs */}
    </>
  );
};

export default App;
