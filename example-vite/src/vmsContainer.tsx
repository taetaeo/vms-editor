import React from "react";
import { EditorView, ToolbarView, ExtractObjectButton, TextModel, useCanvasCtxHandler } from "vms-editor";
// import ToolbarView from "./toolbar.view";

const VmsContainer = () => {
  const canvasCtx = useCanvasCtxHandler();

  return (
    <main className="vms-editor-main-wrap">
      {/* 툴바 - 시작 */}
      <section>
        <ToolbarView />
      </section>
      {/* 툴바 - 끝 */}

      {/* 기타 옵션 - 시작 */}
      <ExtractObjectButton>데이터추출</ExtractObjectButton>
      <button onClick={() => console.clear()}>콘솔지우기</button>
      <button onClick={() => console.log("데이터", canvasCtx.canvas?.getObjects())}>데이터 가져오기</button>

      <button
        onClick={() => {
          const textModel = new TextModel("텍스트 입력", { id: "12", fill: "#fff", fontSize: 40 });
          canvasCtx.canvas?.add(textModel);
          canvasCtx.canvas?.renderAll();
        }}
      >
        데이터 추가
      </button>
      {/* 기타 옵션 - 끝 */}
      <EditorView />
    </main>
  );
};

export default VmsContainer;
