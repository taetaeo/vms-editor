import { useState } from "react";
// Types
import type { CanvasModel, ObjectConfigsImageObject, ObjectConfigsTextObject, ObjectConfigsVideoObject } from "vms-editor";
// Hooks
import { objectConfigs, toolbarConfigs, useFetch, vmsConfigs } from "vms-editor";
// Components
import { CanvasProvider, EditorProvider, FormProvider, ImageSelectorProvider, ToolbarProvider, VideoProvider, VmsProvider, VmsTabProvider } from "vms-editor";
import VmsContainer from "./vmsContainer";

import "vms-editor/dist/css/vms-editor.css";

type CanvasProps = CanvasModel<ObjectConfigsTextObject, ObjectConfigsImageObject, ObjectConfigsVideoObject> | null;

function App() {
  const [canvas, setCanvas] = useState<CanvasProps>(null); // canvas 상태 추가

  const { data, loading, error } = useFetch("http://localhost:8080/api/v1/vms/form/form-1");

  return (
    <>
      {/* Canvas Provider */}
      <CanvasProvider canvas={canvas!} setCanvas={setCanvas}>
        {/* Form Provider */}
        <FormProvider data={data} loading={loading} error={error}>
          {/* Video Provider */}
          <VideoProvider>
            {/* Image Provider */}
            <ImageSelectorProvider>
              {/* Toolbar Provider */}
              <ToolbarProvider toolbarUiConfig={toolbarConfigs}>
                {/* Vms Tab Provider */}
                <VmsTabProvider>
                  {/* Vms Provider */}
                  <VmsProvider vmsConfigs={vmsConfigs}>
                    {/* Editor Provider */}
                    <EditorProvider editorConfigs={objectConfigs}>
                      {/* Vms Container */}
                      <VmsContainer />
                    </EditorProvider>
                  </VmsProvider>
                </VmsTabProvider>
              </ToolbarProvider>
            </ImageSelectorProvider>
          </VideoProvider>
        </FormProvider>
      </CanvasProvider>
    </>
  );
}

export default App;
