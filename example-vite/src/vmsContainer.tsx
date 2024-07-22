import React, { useState } from "react";
import { EditorView, ToolbarView, ToolbarView2, ExtractObjectButton, TextModel, useCanvasCtxHandler, toolbarConfigs, useToolbarCtxHandler } from "vms-editor";
import ArrowIcon from "./ui/atoms/arrow.icon";
// import ToolbarView from "./toolbar.view";

const VmsContainer = () => {
  const canvasCtx = useCanvasCtxHandler();

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <main className="vms-editor-main-wrap">
      {/* 툴바 - 시작 */}
      <section className="dflx_ac col_gap48 dashed_box p-20 m-b-50 m-r-40">
        <ToolbarView isTextAlign isTextColor isTextStyle isBackgroundColor />

        {/* <ToolbarView2 /> */}
      </section>
      {/* 툴바 - 끝 */}

      {/* 기타 옵션 - 시작 */}
      <div className="dflx_ac col_gap48 dashed_box p-20 m-b-50 m-r-40">
        <ExtractObjectButton className="btn_primary btn_ms">데이터추출</ExtractObjectButton>
        <button className="btn_primary btn_ms" onClick={() => console.clear()}>
          콘솔지우기
        </button>
        <button className="btn_primary btn_ms editor" onClick={() => console.log("데이터", canvasCtx.canvas?.getObjects())}>
          데이터 가져오기
        </button>
      </div>

      {/* 기타 옵션 - 끝 */}
      <EditorView />
    </main>
  );
};

export default VmsContainer;
