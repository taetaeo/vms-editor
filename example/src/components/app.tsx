import React, { ReactNode } from "react";

import { toolbarConfigs, objectConfigs } from "vms-editor";

import { ToolbarProvider, ObjectFontStyle, EditorProvider } from "vms-editor";
import VmsContainer from "./vms-container";
import { CanvasModel } from "vms-editor/src/models";

const App = (): ReactNode => {
  const [canvas, setCanvas] = React.useState<CanvasModel<any, any, any> | null>(null); // canvas 상태 추가

  return (
    <>
      {/* Toolbar Configs */}
      <ToolbarProvider uiConfigs={toolbarConfigs}>
        <EditorProvider editorConfig={objectConfigs}>
          <VmsContainer canvas={canvas!} setCanvas={setCanvas} />
        </EditorProvider>
      </ToolbarProvider>
      {/* Toolbar Configs */}
    </>
  );
};

export default App;
