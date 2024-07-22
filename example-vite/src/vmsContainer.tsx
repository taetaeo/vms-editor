import React from "react";
import { EditorView, ToolbarView, ExtractObjectButton, TextModel, useCanvasCtxHandler } from "vms-editor";
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
        <ToolbarView />
      </section>
      {/* 툴바 - 끝 */}

      {/* 기타 옵션 - 시작 */}
      <div className="dflx_ac col_gap48 dashed_box p-20 m-b-50 m-r-40">
        <ArrowIcon width={"12"} height={"12"} color="black" />
        <ExtractObjectButton className="btn_primary btn_ms">데이터추출</ExtractObjectButton>
        <button className="btn_primary btn_ms" onClick={() => console.clear()}>
          콘솔지우기
        </button>
        <button className="btn_primary btn_ms editor" onClick={() => console.log("데이터", canvasCtx.canvas?.getObjects())}>
          데이터 가져오기
        </button>
        <button type="button" className="btn_primary btn_ms editor selected">
          320 X 64
        </button>
        <button type="button" className="btn_secondary btn_ms">
          320 X 64
        </button>
        <button type="button" className="btn_secondary btn_ms disabled">
          480 X 96
        </button>
      </div>

      {/* 기타 옵션 - 끝 */}
      <EditorView />
    </main>
  );
};

export default VmsContainer;
