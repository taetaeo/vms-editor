import * as R from "react";
import cn from "classnames";
// Handlers
import {
  useToolbarCtxHandler,
  useVideoCtxHandler,
  useCanvasCtxHandler,
} from "../shared/handlers";

import { ToolbarModel } from "../models";

interface Props
  extends R.HtmlHTMLAttributes<HTMLElement>,
    R.PropsWithChildren {}

const ToolbarView: R.FC<Props> = ({ style, children, ...rest }) => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const toolbarModel = new ToolbarModel(videoCtx, canvasCtx, toolbarCtx);

  return (
    <div>
      {/* 객체 추가 버튼 Start */}
      <button
        id="type"
        value="textBox"
        onClick={toolbarModel.handleChangeObjectType}
      >
        텍스트 추가하기
      </button>
      <button
        id="type"
        value="image"
        onClick={toolbarModel.handleChangeObjectType}
      >
        이미지 추가하기
      </button>
      <button
        id="type"
        value="video"
        onClick={toolbarModel.handleChangeObjectType}
      >
        동영상 추가하기
      </button>
      {/* 객체 추가 버튼 End */}

      {/* 정렬 스타일 Start*/}
      <button
        id="font_align"
        value="left"
        onClick={toolbarModel.handleChangeFontAlign}
      >
        왼쪽 정렬
      </button>
      <button
        id="font_align"
        value="center"
        onClick={toolbarModel.handleChangeFontAlign}
      >
        가운데 정렬
      </button>
      <button
        id="font_align"
        value="right"
        onClick={toolbarModel.handleChangeFontAlign}
      >
        오른쪽 정렬
      </button>
      {/* 정렬 스타일 End */}
    </div>
  );
};

export default ToolbarView;
