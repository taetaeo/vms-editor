// Functions
import { useToolbarCtxHandler, useVideoCtxHandler, useCanvasCtxHandler } from "../shared/handlers";

import { ToolbarModel } from "../models";

const ToolbarView = () => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const viewModel = new ToolbarModel(videoCtx, canvasCtx, toolbarCtx);

  return (
    <div>
      <button id="type" value="textBox" onClick={viewModel.handleChangeObjectType}>
        텍스트 추가하기
      </button>
      <button id="type" value="image" onClick={viewModel.handleChangeObjectType}>
        이미지 추가하기
      </button>
      <button id="type" value="video" onClick={viewModel.handleChangeObjectType}>
        동영상 추가하기
      </button>

      <button></button>
    </div>
  );
};

export default ToolbarView;
