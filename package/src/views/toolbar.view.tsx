import * as R from "react";
// Models
import { ToolbarModel } from "../models";
// Handlers
import { useToolbarCtxHandler, useVideoCtxHandler, useCanvasCtxHandler } from "../shared/handlers";
// Hooks
import { useToggle } from "../shared/hooks";
// Widgets
import {
  ColorPicker,
  LayoutModuleWidget,
  ObjectAddWidget,
  ObjectAlignWidget,
  ObjectBgColorWidget,
  ObjectSizeWidget,
  TextAlignWidget,
  TextColorWidget,
  TextStyleWidget,
} from "../components/widgets";

interface Props extends R.HtmlHTMLAttributes<HTMLElement>, R.PropsWithChildren {
  isTextAlign?: boolean;
  isTextColor?: boolean;
  isTextStyle: boolean;
  isBackgroundColor?: boolean;
  isBorderColor?: boolean;
  isBorderWidth?: boolean;
  isBorderStyle?: boolean;
}

const ToolbarView: R.FC<Props> = ({
  isTextStyle = false,
  isTextAlign = false,
  isTextColor = false,
  isBackgroundColor = false,
  isBorderColor = false,
  isBorderStyle = false,
  isBorderWidth = false,
  style,
  children,
  ...rest
}) => {
  const videoCtx = useVideoCtxHandler();
  const canvasCtx = useCanvasCtxHandler();
  const toolbarCtx = useToolbarCtxHandler();

  const { isOpen: isShowFontColorPicker, onToggle: toggleFontColorPicker } = useToggle();
  const { isOpen: isShowObjColorPicker, onToggle: toggleObjectColorPicker } = useToggle();

  const toolbarModel = new ToolbarModel(videoCtx, canvasCtx, toolbarCtx);
  return (
    <dl className="comp_dl m-0">
      <dd>
        <article className="">
          <div className="dflx_ac gap_colm8 m-b-12">
            <LayoutModuleWidget>
              <LayoutModuleWidget.SizeButton value="40_16" onClick={toolbarModel.handleChangeEditorSize}>
                40 x 16
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="384_96" onClick={toolbarModel.handleChangeEditorSize}>
                384 x 96
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="384_96" onClick={toolbarModel.handleChangeEditorSize}>
                384 x 96
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="480_96" onClick={toolbarModel.handleChangeEditorSize}>
                480 x 96
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="64_32" onClick={toolbarModel.handleChangeEditorSize}>
                64 x 32
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="176_32" onClick={toolbarModel.handleChangeEditorSize}>
                176 x 32
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="1440_192" onClick={toolbarModel.handleChangeEditorSize}>
                1440 x 192
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="384_288" onClick={toolbarModel.handleChangeEditorSize}>
                384 x 288
              </LayoutModuleWidget.SizeButton>
              <LayoutModuleWidget.SizeButton value="416_320" onClick={toolbarModel.handleChangeEditorSize}>
                416 x 320
              </LayoutModuleWidget.SizeButton>
            </LayoutModuleWidget>
          </div>
          {/* 객체 추가 버튼 - 시작 */}
          <div className="dflx_ac gap_colm8 m-b-12">
            <ObjectAddWidget>
              <ObjectAddWidget.Text onClick={toolbarModel.handleChangeObjectType} />
              <ObjectAddWidget.Image onClick={toolbarModel.handleChangeObjectType} />
              <ObjectAddWidget.Video onClick={toolbarModel.handleChangeObjectType} />
            </ObjectAddWidget>
            {/* 객체 추가 버튼 - 끝 */}

            <span className="pipe28" />

            {/* 텍스트 스타일 - 시작 */}
            <TextStyleWidget>
              <TextStyleWidget.Bold
                variant="primary"
                value={toolbarModel.toolbarCtx.selectedOptions?.font.bold}
                onClick={toolbarModel.handleChangeObjectType}
              />
              <TextStyleWidget.Underline
                variant="primary"
                value={Number(toolbarModel.toolbarCtx.selectedOptions?.font.underLine)}
                onClick={toolbarModel.handleChangeFontUnderline}
              />
              <TextStyleWidget.FontSize
                size="md"
                list={Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.fontSizes || [])}
                defaultValue={0}
                value={toolbarModel.toolbarCtx.selectedOptions?.font.size}
                onChange={toolbarModel.handleChangeFontSize}
              />
            </TextStyleWidget>

            <span className="pipe28" />

            {/* 텍스트 스타일 - 끝 */}

            {/* 정렬 스타일 - 시작*/}
            <TextAlignWidget>
              <TextAlignWidget.Left onClick={toolbarModel.handleChangeFontAlign} />
              <TextAlignWidget.Center onClick={toolbarModel.handleChangeFontAlign} />
              <TextAlignWidget.Right onClick={toolbarModel.handleChangeFontAlign} />
            </TextAlignWidget>

            {/* 정렬 스타일 End */}
            <span className="pipe28" />

            {/* 텍스트 색상 설정 Start */}
            <TextColorWidget>
              <TextColorWidget.More />
              {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
                // 색상 버튼
                if (color !== "more") {
                  return (
                    <TextColorWidget.Color key={`font_color-${index}`} color={color} onClick={toolbarModel.handleChangeFontColor}>
                      가
                    </TextColorWidget.Color>
                  );
                }
                // 더보기
                else {
                  return (
                    <TextColorWidget.More key={`font_color_${index}`} onClick={toggleFontColorPicker}>
                      더보기
                    </TextColorWidget.More>
                  );
                }
              })}
            </TextColorWidget>
            {/* 텍스트 색상 설정 - 끝 */}
          </div>

          {/* 객체 사이즈 설정 - 시작 */}
          <ObjectSizeWidget>
            <ObjectSizeWidget.Width
              width="140"
              value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.size.w)}
              onClick={toolbarModel.handleClickObjectWidth}
            />
            <ObjectSizeWidget.Height
              width="140"
              value={Number(toolbarModel.toolbarCtx.selectedOptions?.object.size.h)}
              onClick={toolbarModel.handleClickObjectHeight}
            />
          </ObjectSizeWidget>

          {/* 객체 사이즈 설정 - 끝 */}

          {/* 객체 이동 설정 - 시작 */}
          <div className="dflx_ac gap_colm8 m-b-12">
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
                type="number"
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
          {/* 객체 이동 설정 - 끝*/}

          <div className="dflx_ac gap_colm8 m-b-12">
            {/* 객체 채우기 - 시작*/}
            <ObjectBgColorWidget>
              {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
                if (color !== "more") {
                  return <ObjectBgColorWidget.BgColor key={`bg_color_${index}`} color={color} onClick={toolbarModel.handleChangeObjectBgColor} />;
                } else {
                  return <ObjectBgColorWidget.More key={`bg_color_${index}`} onClick={toggleObjectColorPicker} />;
                }
              })}
              <ObjectBgColorWidget.BgColor />
            </ObjectBgColorWidget>
          </div>
          {/* 객체 채우기 - 끝*/}

          {isBorderColor && (
            <div className="dflx_ac gap_colm8 m-b-12">
              {/* 객체 테두리 - 색상 Start */}
              <div className="vms-editor-flx">
                {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.colors || []).map((color, index) => {
                  return (
                    <button
                      key={`border_color_${index}`}
                      id={`object_style_border_${color}`}
                      value={color}
                      onClick={toolbarModel.handleChangeObjectBorderColor}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {isBorderStyle && (
            <div className="dflx_ac gap_colm8 m-b-12">
              {Object.values(toolbarModel.toolbarCtx.toolbarUiConfig?.borders || []).map((border, index) => {
                return (
                  <button key={`border_style_${index}`} id={`object_style_border_${border}`} onClick={toolbarModel.handleChangeObjectBorderStyle}>
                    {border}
                  </button>
                );
              })}
            </div>
          )}
          {/* 객체 테두리 - 색상 End */}

          {/* 객체 테두리 - 두께 Start */}
          {isBorderWidth && (
            <div className="dflx_ac gap_colm8 m-b-12">
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
          )}

          {/* 객체 테두리 - 두께 End */}

          {/* 객체 정렬 Start */}

          <ObjectAlignWidget>
            <ObjectAlignWidget.HorizonLeft />
            <ObjectAlignWidget.HorizonCenter />
            <ObjectAlignWidget.HorizonRight />
            <span className="pipe28" />
            <ObjectAlignWidget.VerticalTop />
            <ObjectAlignWidget.VerticalCenter />
            <ObjectAlignWidget.VerticalBottom />
          </ObjectAlignWidget>

          {/* 객체 정렬 End */}

          {isShowFontColorPicker && (
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
          )}

          <video ref={toolbarModel.videoCtx.videoRef} style={{ display: "none" }} />
        </article>
      </dd>
    </dl>
  );
};

export default ToolbarView;

{
  /* <div className="vms-editor-flx">
        <button id="type" value="textBox" onClick={toolbarModel.handleChangeObjectType}>
          텍스트 추가하기
        </button>
        <button id="type" value="image" onClick={toolbarModel.handleChangeObjectType}>
          이미지 추가하기
        </button>
        <button id="type" value="video" onClick={toolbarModel.handleChangeObjectType}>
          동영상 추가하기
        </button>
      </div> */
}

{
  /* <div className="vms-editor-flx">
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
      </div> */
}

{
  /* <div className="vms-editor-flx">
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
</div> */
}

{
  /* <div className="vms-editor-flx">
        <button id="font_align" value="left" onClick={toolbarModel.handleChangeFontAlign}>
          왼쪽 정렬
        </button>
        <button id="font_align" value="center" onClick={toolbarModel.handleChangeFontAlign}>
          가운데 정렬
        </button>
        <button id="font_align" value="right" onClick={toolbarModel.handleChangeFontAlign}>
          오른쪽 정렬
        </button>
      </div> */
}

{
  /* <div className="vms-editor-flx">
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
      </div> */
}
{
  /* <div className="vms-editor-flx">
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
          </div> */
}
{
  /* <div className="dflx_ac gap_colm8 m-b-12">
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
          </div> */
}
