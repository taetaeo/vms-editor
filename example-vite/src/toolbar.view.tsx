import * as R from "react";
import { ToolbarModel, useCanvasCtxHandler, useToggle, useToolbarCtxHandler, useVideoCtxHandler } from "vms-editor";

interface Props extends R.HtmlHTMLAttributes<HTMLElement>, R.PropsWithChildren {}

const ToolbarView: R.FC<Props> = ({ style, children, ...rest }) => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const { isOpen: isShowFontColorPicker, onToggle: toggleFontColorPicker } = useToggle();
  const { isOpen: isShowObjColorPicker, onToggle: toggleObjectColorPicker } = useToggle();

  const toolbarModel = new ToolbarModel(videoCtx, canvasCtx, toolbarCtx);

  return (
    <div>
      {/* 객체 추가 버튼 Start */}
      <div className="vms-editor-flx">
        <button id="type" value="textBox" onClick={toolbarModel.handleChangeObjectType}>
          텍스트 추가하기
        </button>
        <button id="type" value="image" onClick={toolbarModel.handleChangeObjectType}>
          이미지 추가하기
        </button>
        <button id="type" value="video" onClick={toolbarModel.handleChangeObjectType}>
          동영상 추가하기
        </button>
      </div>
      {/* 객체 추가 버튼 End */}

      {/* 텍스트 스타일 Start */}
      <div className="vms-editor-flx">
        <button id="font_bold" value={toolbarModel.toolbarCtx.selectedOptions?.font.bold} onClick={toolbarModel.handleChangeFontBold}>
          굵기
        </button>
        <button id="font_underline" value={Number(toolbarModel.toolbarCtx.selectedOptions?.font.underLine)} onClick={toolbarModel.handleChangeFontUnderline}>
          밑줄
        </button>
        <select id="font_size" value={toolbarModel.toolbarCtx.selectedOptions?.font.size} onChange={toolbarModel.handleChangeFontSize}>
          {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.fontSizes || []).map((fontSize, index) => (
            <option key={`${fontSize}-${index}`} value={fontSize}>
              {fontSize ? fontSize : 0}
            </option>
          ))}
        </select>
      </div>
      {/* 텍스트 스타일 End */}

      {/* 정렬 스타일 Start*/}
      <div className="vms-editor-flx">
        <button id="font_align" value="left" onClick={toolbarModel.handleChangeFontAlign}>
          왼쪽 정렬
        </button>
        <button id="font_align" value="center" onClick={toolbarModel.handleChangeFontAlign}>
          가운데 정렬
        </button>
        <button id="font_align" value="right" onClick={toolbarModel.handleChangeFontAlign}>
          오른쪽 정렬
        </button>
      </div>
      {/* 정렬 스타일 End */}

      {/* 텍스트 색상 설정 Start */}
      <div className="vms-editor-flx">
        {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          // [더보기] x
          if (color !== "more") {
            return (
              <button key={`font_color-${index}`} id={`font_${color}`} value={color} onClick={toolbarModel.handleChangeFontColor}>
                {color}
              </button>
            );
          }
          // [더보기] o
          else {
            return (
              <button key={`font_color_${index}`} onClick={toggleFontColorPicker}>
                더보기
              </button>
            );
          }
        })}
      </div>

      {/* 텍스트 색상 설정 End */}

      {/* 객체 사이즈 설정 Start */}
      <div className="vms-editor-flx">
        <label htmlFor="object_size_w">
          너비
          <input
            type="number"
            name="object_size_w"
            id="object_size_w"
            value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.size.w)}
            onChange={toolbarModel.handleChangeObjectSize}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarModel.toolbarCtx.selectedOptions?.object.size.w + " px"}</span>
        </label>

        <label htmlFor="object_size_h">
          높이
          <input
            type="number"
            name="object_size_h"
            id="object_size_h"
            value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.size.h)}
            onChange={toolbarModel.handleChangeObjectSize}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarModel.toolbarCtx.selectedOptions?.object.size.h + " px"}</span>
        </label>
      </div>
      {/* 객체 사이즈 설정 End */}

      {/* 객체 이동 설정 Start*/}
      <div className="vms-editor-flx">
        <label htmlFor="object_coord_x">
          수평 이동
          <input
            type="number"
            name="object_coord_x"
            id="object_coord_x"
            value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.coord.x)}
            onChange={toolbarModel.handleChangeObjectCoord}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarModel.toolbarCtx.selectedOptions?.object.coord.x + " px"}</span>
        </label>

        <label htmlFor="object_coord_y">
          수직 이동
          <input
            type="range"
            name="object_coord_y"
            id="object_coord_y"
            value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.coord.y)}
            onChange={toolbarModel.handleChangeObjectCoord}
            min={0} // 최소값 설정
            max={2000} // 최대값 설정
            step={1} // 단계 설정
          />
          <span>{toolbarModel.toolbarCtx.selectedOptions?.object.coord.y + " px"}</span>
        </label>
      </div>
      {/* 객체 이동 설정 End*/}

      {/* 객체 채우기 - 색상  Start*/}
      <div className="vms-editor-flx">
        {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          // [더보기] x
          if (color !== "more") {
            return (
              <button key={`bg_color_${index}`} id={`object_style_background_${color}`} value={color} onClick={toolbarModel.handleChangeObjectBgColor}>
                {color}
              </button>
            );
          }
          // [더보기] o
          else {
            return (
              <button key={`font_color_${index}`} onClick={toggleObjectColorPicker}>
                더보기
              </button>
            );
          }
        })}
      </div>
      {/* 객체 채우기 - 색상  End*/}

      {/* 객체 테두리 - 색상 Start */}
      <div className="vms-editor-flx">
        {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
          return (
            <button key={`border_color_${index}`} id={`object_style_border_${color}`} value={color} onClick={toolbarModel.handleChangeObjectBorderColor}>
              {color}
            </button>
          );
        })}
      </div>

      <div className="vms-editor-flx">
        {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.borders || []).map((border, index) => {
          return (
            <button key={`border_style_${index}`} id={`object_style_border_${border}`} onClick={toolbarModel.handleChangeObjectBorderStyle}>
              {border}
            </button>
          );
        })}
      </div>
      {/* 객체 테두리 - 색상 End */}

      {/* 객체 테두리 - 두께 Start */}
      <div className="vms-editor-flx">
        <label htmlFor="">
          설정
          <input
            type="number"
            name="object_border_width"
            id="object_border_width"
            inputMode="numeric"
            value={toolbarModel.toolbarCtx.selectedOptions?.object.style.border.width || 1}
            min={0}
            max={10}
            onChange={toolbarModel.handleChangeObjectBorderWidth}
          />
          <span>{toolbarModel.toolbarCtx.selectedOptions?.object.style.border.width + " px"}</span>
        </label>
      </div>
      {/* 객체 테두리 - 두께 End */}

      {/* 객체 정렬 Start */}
      <div className="vms-editor-flx">
        <button id="object_horizon_left" value="left" onClick={toolbarModel.handleChangeObjectSorting}>
          수평 왼쪽 정렬
        </button>
        <button id="object_horizon_right" value="right" onClick={toolbarModel.handleChangeObjectSorting}>
          수평 오른쪽 정렬
        </button>
        <button id="object_horizon_center" value="center" onClick={toolbarModel.handleChangeObjectSorting}>
          수평 가운데 정렬
        </button>
        <button id="object_vertical_top" value="top" onClick={toolbarModel.handleChangeObjectSorting}>
          수직 위 정렬
        </button>
        <button id="object_vertical_bottom" value="bottom" onClick={toolbarModel.handleChangeObjectSorting}>
          수직 아래 정렬
        </button>
        <button id="object_vertical_center" value="center" onClick={toolbarModel.handleChangeObjectSorting}>
          수직 가운데 정렬
        </button>
      </div>
      {/* 객체 정렬 End */}

      {/* {isShowFontColorPicker && (
        <ColorPicker
          type="chrome"
          initialColor={toolbarModel.toolbarCtx.selectedOptions?.font.color!}
          onColorChange={toolbarModel.handleChangeFontColorPicker}
        />
      )}

      {isShowObjColorPicker && (
        <ColorPicker
          type="chrome"
          initialColor={toolbarModel.toolbarCtx.selectedOptions?.object.style.background!}
          onColorChange={toolbarModel.handleChangeObjectBgColorPicker}
        />
      )} */}

      <video ref={toolbarModel.videoCtx.videoRef} style={{ display: "none" }} />
    </div>
  );
};

export default ToolbarView;
