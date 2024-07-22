import type { FC, ChangeEvent, MouseEvent } from "react";
import { CanvasModel, ObjectVariant, Utils, useToggle, useToolbar, useToolbarToggle } from "vms-editor";

import { TOOLBAR_CONST_KEY } from "vms-editor/dist/src/enums";
import React from "react";
import * as Icon from "../icons/icons";

type Props = {
  canvas: CanvasModel<any, any, any>;
};

const ToolbarContainer: FC<Props> = ({ canvas }) => {
  const utils = new Utils();
  const {
    toolbarUiConfig,
    isActive,
    toggle: toggleToolbar,
    selectedOptions,
    onchangeValue,

    onchangeObjectBackgroundColor,
    onchangeObjectBorderWidth,
    onchangeObjectFontBold,
    onchangeObjectFontColor,
    onchangeObjectFontSize,
    onchangeObjectFontUnderline,
    onchangeObjectWidth,
    onchangeObjectHeight,
    onchangeObjectCoordX,
    onchangeObjectCoordY,
  } = useToolbar();
  const { textActive, objectActive, previewActive, groupActive, toggle } = useToolbarToggle();

  const { isOpen: isShowFontColor, onToggle: onToggleAboutFontColor } = useToggle();

  /**글씨 사이즈 설정 */
  const onChangeObjectType = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    if (onchangeValue && typeof onchangeValue === "function") {
      onchangeValue(id as TOOLBAR_CONST_KEY, selectedOptions?.type === "image" ? undefined : value);
    }
    const textObject = canvas.onCreateObject(value as ObjectVariant, "" || "텍스트를 입력해주세요", {
      id: "",
      left: selectedOptions?.object.coord.x, // x 축
      top: selectedOptions?.object.coord.y, // Y축
      width: selectedOptions?.object.size.w, // 너비
      height: selectedOptions?.object.size.h, // 높이
      fontSize: selectedOptions?.font.size || 14, // 폰트 사이즈
      fill: selectedOptions?.font.color, // 폰트 색상
      fontWeight: selectedOptions?.font.bold, // 굵기
      underline: selectedOptions?.font.underLine, // 밑줄
      fontFamily: selectedOptions?.font.family, // 폰트 스타일
      backgroundColor: selectedOptions?.object.style.background, // 배경색
      // stroke: selectedOptions?.object.style.border.color,
      // strokeWidth: selectedOptions?.object.style.border.width,
      selectionBorderColor: selectedOptions?.object.style.border.color,
    });

    if (!textObject) return;

    canvas.add(textObject as fabric.Object);

    if (onchangeValue && typeof onchangeValue === "function") {
      onchangeValue(id as TOOLBAR_CONST_KEY, undefined);
    }
  };

  /**
   * ==========================================================================
   *                                Font Styles
   * ==========================================================================
   */

  /**글씨 굵기 설정 */
  const onChangeFontBold = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, bold] = id.split("_");

    if (!font) return;

    const targetValue = Number(value) == 700 ? 400 : 700;

    if (canvas.selectedObjects) {
      utils.executeIfFunction(onchangeObjectFontBold, canvas, targetValue);
    }

    utils.executeIfFunction(onchangeValue, font as TOOLBAR_CONST_KEY, { ...selectedOptions?.font, bold: targetValue });
  };

  /**글씨 사이즈 설정 */
  const onChangeFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;

    const [font, size] = id.split("_");

    if (!font) return;

    const targetValue = Number(value);

    if (canvas.selectedObjects) {
      utils.executeIfFunction(onchangeObjectFontSize, canvas, targetValue);
    }

    utils.executeIfFunction(onchangeValue, font as TOOLBAR_CONST_KEY, { ...selectedOptions?.font, size: targetValue });
  };

  /**글씨 밑줄 설정 */
  const onChangeFontUnderline = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, underline] = id.split("_");

    if (!font) return;

    const targetValue = Number(value) === 1 ? false : true;

    if (canvas.selectedObjects) {
      utils.executeIfFunction(onchangeObjectFontUnderline, canvas, targetValue);
    }

    utils.executeIfFunction(onchangeValue, font as TOOLBAR_CONST_KEY, { ...selectedOptions?.font, underLine: targetValue });
  };

  /**글자 색상 변경 */
  const onChangeFontColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [font, color] = id.split("_");

    if (!font) return;

    if (canvas.selectedObjects) {
      utils.executeIfFunction(onchangeObjectFontColor, canvas, value);
    }

    utils.executeIfFunction(onchangeValue, font as TOOLBAR_CONST_KEY, { ...selectedOptions?.font, color: value });
  };

  /**
   * ==========================================================================
   *                                Font Styles
   * ==========================================================================
   */

  /**객체 사이즈 설정 */
  const onChangeObjectSize = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, size, wh] = id.split("_");

    const targetValue = Number(value);

    if (wh === "w") {
      if (canvas.selectedObjects) {
        utils.executeIfFunction(onchangeObjectWidth, canvas, value);
      }
      utils.executeIfFunction(onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        size: { ...selectedOptions?.object.size, w: targetValue },
      });
    } else if (wh === "h") {
      if (canvas.selectedObjects) {
        utils.executeIfFunction(onchangeObjectHeight, canvas, value);
      }
      utils.executeIfFunction(onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        size: { ...selectedOptions?.object.size, h: targetValue },
      });
    }
  };

  /**객체 좌표 설정 */
  const onChangeObjectCoord = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, size, coord] = id.split("_");

    const targetValue = Number(value);
    if (coord === "x") {
      if (canvas.selectedObjects) {
        utils.executeIfFunction(onchangeObjectCoordX, canvas, targetValue);
      }
      utils.executeIfFunction(onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        coord: { ...selectedOptions?.object.coord, x: targetValue },
      });
    } else if (coord === "y") {
      if (canvas.selectedObjects) {
        utils.executeIfFunction(onchangeObjectCoordY, canvas, targetValue);
      }
      utils.executeIfFunction(onchangeValue, object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        coord: { ...selectedOptions?.object.coord, y: targetValue },
      });
    }
  };

  /**객체 배경색 설정 */
  const onChangeObjectBgColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, background, color] = id.split("_");

    if (canvas.selectedObjects) {
      utils.executeIfFunction(onchangeObjectBackgroundColor, canvas, color);
    }

    utils.executeIfFunction(onchangeValue, object as TOOLBAR_CONST_KEY, {
      ...selectedOptions?.object,
      style: { ...selectedOptions?.object.style, background: color },
    });
  };

  /**객체 테두리 색상 설정 */
  const onChangeObjectBorderColor = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, border, color] = id.split("_");

    if (onchangeValue && typeof onchangeValue === "function") {
      onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        style: {
          ...selectedOptions?.object.style,
          border: {
            ...selectedOptions?.object.style.border,
            color,
          },
        },
      });
    }
  };

  /**객체 테두리 스타일 설정 */
  const onChangeObjectBorderStyle = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;

    const [object, style, border, borderStyle] = id.split("_");

    if (onchangeValue && typeof onchangeValue === "function") {
      onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        style: {
          ...selectedOptions?.object.style,
          border: {
            ...selectedOptions?.object.style.border,
            style: borderStyle,
          },
        },
      });
    }
  };

  /**객체 테두리 너비 설정 */
  const onChangeObjectBorderWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const [object, border, width] = id.split("_");

    if (onchangeValue && typeof onchangeValue === "function") {
      onchangeValue(object as TOOLBAR_CONST_KEY, {
        ...selectedOptions?.object,
        style: {
          ...selectedOptions?.object.style,
          border: {
            ...selectedOptions?.object.style.border,
            width: Number(value),
          },
        },
      });
    }
  };

  /**객체 정렬 설정 */
  const onChangeObjectSorting = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    console.log(id, value);

    const [obj, sort, direction] = id.split("_");

    // if (direction === "top") {

    // } else if (direction === "bottom") {
    // } else if (direction === "left") {
    // } else if (direction === "right") {
    // } else if (direction === "mid") {
    // }
  };
  return (
    <section className={`vms-editor__toolbar-wrapper ${isActive ? "inactive" : ""}`}>
      <button className={`transition-button ${isActive && "is-active"}`} onClick={toggleToolbar} style={{ position: "absolute", right: 0, top: 0 }}>
        <Icon.HamburgerIcon color={!isActive ? "#000" : "#fff"} />
      </button>
      {!isActive && (
        <div className="vms-editor__options-box">
          <h2 className="vms-editor__h2">옵션 설정하기</h2>
          {/* 
          ===============================================================
                                  객체 추가하기
          ===============================================================
        */}
          <h3 className="vms-editor__h3">객체 추가하기</h3>
          <div className="vms-editor__divider" />

          <ul className="vms-editor__list">
            {/* 텍스트 추가 버튼 */}
            <li className="vms-editor__list-item">
              <button
                id="type"
                className={`vms-editor__default-button ${selectedOptions?.type === "text" ? "is-active" : ""}`}
                value="text"
                onClick={onChangeObjectType}
              >
                <Icon.TextIcon />
              </button>
            </li>
            {/* 텍스트 추가 버튼 */}

            {/* 이미지 추가 버튼 */}
            <li className="vms-editor__list">
              <button
                id="type"
                className={`vms-editor__default-button ${selectedOptions?.type === "image" ? "is-active" : ""}`}
                value="image"
                onClick={onChangeObjectType}
              >
                <Icon.ImageIcon />
              </button>
            </li>
            {/* 이미지 추가 버튼 */}

            {/* 이미지 추가 버튼 */}
            <li className="vms-editor__list">
              <button
                id="type"
                className={`vms-editor__default-button ${selectedOptions?.type === "video" ? "is-active" : ""}`}
                value="video"
                onClick={onChangeObjectType}
              >
                <Icon.VideoIcon />
              </button>
            </li>
            {/* 이미지 추가 버튼 */}

            {/* 이미지 추가 버튼 */}

            {/* 이미지 추가 버튼 */}
          </ul>

          {/* 
          ===============================================================
                                  폰트 설정
          ===============================================================
        */}
          <Ui.Flex pl={16} pr={16}>
            <Ui.H3>텍스트 설정</Ui.H3>
            <Ui.TransitionButton id={"text"} isActive={textActive} onClick={toggle}>
              <Icon.downTriArrow />
            </Ui.TransitionButton>
          </Ui.Flex>
          <Ui.Divider />

          <Ui.TransitionWrapper isActive={textActive}>
            {textActive && (
              <Ui.ToolbarOptions.List>
                <Ui.ToolbarOptions.Item>
                  <Ui.H3>텍스트 스타일</Ui.H3>
                  <Ui.Flex wrap="wrap">
                    {/* 굵기 설정 버튼 */}
                    <Ui.DefaultButton
                      //
                      id="font_bold"
                      value={selectedOptions?.font.bold}
                      onClick={onChangeFontBold}
                      isActive={selectedOptions?.font.bold === 700}
                    >
                      <Icon.BoldIcon />
                    </Ui.DefaultButton>
                    {/* 굵기 설정 버튼 */}

                    {/* 밑줄 설정 버튼 */}
                    <Ui.DefaultButton
                      id="font_underline"
                      value={Number(selectedOptions?.font.underLine)}
                      onClick={onChangeFontUnderline}
                      isActive={selectedOptions?.font.underLine}
                    >
                      <Icon.UnderLineIcon />
                    </Ui.DefaultButton>
                    {/* 밑줄 설정 버튼 */}

                    {/* 글씨 크기 설정 버튼 */}
                    <Ui.ToolbarSelect id="font_size" onChange={onChangeFontSize}>
                      {Object.values(uiConfigs?.fontSizeConfigs || []).map((fontSize, index) => (
                        <option key={`${fontSize}-${index}`} value={fontSize}>
                          {fontSize ? fontSize : 0}
                        </option>
                      ))}
                    </Ui.ToolbarSelect>
                    {/* 글씨 크기 설정 버튼 */}
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>

                {/* 정렬 설정 */}
                <Ui.ToolbarOptions.Item>
                  <Ui.H5>정렬 스타일</Ui.H5>
                  <Ui.Flex wrap="wrap" justify="start">
                    <Ui.DefaultButton>
                      <Icon.LeftSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton>
                      <Icon.CenterSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton>
                      <Icon.RightSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton>
                      <Icon.BothSideIcon />
                    </Ui.DefaultButton>
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
                {/* 정렬 설정 */}

                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>텍스트 색상</Ui.H5>
                  <Ui.Flex wrap="wrap" gap={2} justify="start">
                    {Object.values(colorConfigs).map((color, index) => {
                      if (color !== "more") {
                        return (
                          <Ui.ColorButton
                            key={`font_color_${index}`}
                            color={color}
                            id={`font_${color}`}
                            value={color}
                            onClick={onChangeFontColor}
                            isActive={color === selectedOptions?.font.color}
                          />
                        );
                      }
                      return (
                        <Ui.DefaultButton key={`font_color_${index}`} style={{ boxShadow: "none", background: "none" }} onClick={onToggleAboutFontColor}>
                          더보기
                        </Ui.DefaultButton>
                      );
                    })}
                    <ColorPicker
                      id={`font_none`}
                      color={selectedOptions?.font.color}
                      onChange={(event: ColorPickerChangeEvent) => {
                        const { target } = event;
                        const newColor = "#" + target.value;
                        target.value = newColor;
                        event.target = target;
                        onChangeFontColor(event as any);
                      }}
                      hidden={!isShowFontColor}
                    />
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
              </Ui.ToolbarOptions.List>
            )}
          </Ui.TransitionWrapper>

          {/* 
          ===============================================================
                                  객체 설정
          ===============================================================
          */}
          <Ui.Flex pl={16} pr={16}>
            <Ui.H3>객체 설정</Ui.H3>
            <Ui.TransitionButton id={"object"} isActive={objectActive} onClick={toggle}>
              <Ui.downTriArrow />
            </Ui.TransitionButton>
          </Ui.Flex>
          <Ui.Divider />

          <Ui.TransitionWrapper isActive={objectActive}>
            {objectActive && (
              <Ui.ToolbarOptions.List style={{ gap: "8px" }}>
                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>객체 크기</Ui.H5>
                  {/* 너비 설정 */}
                  <Ui.Label htmlFor="object_size_w">
                    너비
                    <Ui.InputRange
                      type="range"
                      name="object_size_w"
                      id="object_size_w"
                      value={Number(selectedOptions?.object.size.w)} // 너비 state를 value로 설정
                      onChange={onChangeObjectSize} // 너비 변경 핸들러 연결
                      min={0} // 최소값 설정
                      max={1100} // 최대값 설정
                      step={1} // 단계 설정
                    />
                    <Ui.LabelSpan>{selectedOptions?.object.size.w + " px"}</Ui.LabelSpan>
                  </Ui.Label>
                  {/* 너비 설정 */}

                  {/* 높이 설정 */}
                  <Ui.Label htmlFor="object_size_h">
                    높이
                    <Ui.InputRange
                      type="range"
                      name="object_size_h"
                      id="object_size_h"
                      value={Number(selectedOptions?.object.size.h)} // 높이 state를 value로 설정
                      onChange={onChangeObjectSize} // 높이 변경 핸들러 연결
                      min={0} // 최소값 설정
                      max={800} // 최대값 설정
                      step={1} // 단계 설정
                    />
                    <Ui.LabelSpan>{selectedOptions?.object.size.h + " px"}</Ui.LabelSpan>
                  </Ui.Label>
                  {/* 높이 설정 */}
                </Ui.ToolbarOptions.Item>

                {/* 객체 이동 설정 */}
                <Ui.ToolbarOptions.Item>
                  <Ui.H5>객체 이동</Ui.H5>
                  {/* 수평 이동 */}
                  <Ui.Label htmlFor="object_coord_x">
                    수평 이동
                    <Ui.InputRange
                      type="range"
                      name="object_coord_x"
                      id="object_coord_x"
                      value={Number(selectedOptions?.object.coord.x)} // 너비 state를 value로 설정
                      onChange={onChangeObjectCoord} // 너비 변경 핸들러 연결
                      min={0} // 최소값 설정
                      max={1100} // 최대값 설정
                      step={1} // 단계 설정
                    />
                    <Ui.LabelSpan>{selectedOptions?.object.coord.x + " px"}</Ui.LabelSpan>
                  </Ui.Label>
                  {/* 수평 이동 */}

                  {/* 수직 이동 */}
                  <Ui.Label htmlFor="object_coord_y">
                    수직 이동
                    <Ui.InputRange
                      type="range"
                      name="object_coord_y"
                      id="object_coord_y"
                      value={Number(selectedOptions?.object.coord.y)} // 높이 state를 value로 설정
                      onChange={onChangeObjectCoord} // 높이 변경 핸들러 연결
                      min={0} // 최소값 설정
                      max={800} // 최대값 설정
                      step={1} // 단계 설정
                    />
                    <Ui.LabelSpan>{selectedOptions?.object.coord.y + " px"}</Ui.LabelSpan>
                  </Ui.Label>
                  {/* 수직 이동 */}
                </Ui.ToolbarOptions.Item>

                {/* 객체 스타일  */}
                {/* 객체 스타일 - 배경색 */}
                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>객체 채우기</Ui.H5>
                  <Ui.Flex wrap="wrap" gap={2} justify="start">
                    {Object.values(colorConfigs).map((color, index) => {
                      return (
                        <Ui.ColorButton
                          key={`bg_color_${index}`}
                          color={color}
                          id={`object_style_background_${color}`}
                          onClick={onChangeObjectBgColor}
                          isActive={color === selectedOptions?.object.style.background}
                        />
                      );
                    })}
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
                {/* 객체 스타일 - 배경색 */}

                {/* 객체 스타일 - 테두리색 */}
                <Ui.ToolbarOptions.Item>
                  <Ui.H5>객체 윤곽선</Ui.H5>
                  <Ui.Flex wrap="wrap" gap={2} justify="start">
                    {Object.values(uiConfigs?.colorConfigs || []).map((color, index) => {
                      return (
                        <Ui.ColorButton
                          key={`border_color_${index}`}
                          color={color}
                          id={`object_style_border_${color}`}
                          onClick={onChangeObjectBorderColor}
                          isActive={color === selectedOptions?.object.style.border.color}
                        />
                      );
                    })}
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
                {/* 객체 스타일 - 테두리색 */}

                {/* 객체 스타일 - 테두리 */}
                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>객체 테두리 스타일</Ui.H5>
                  <Ui.Flex wrap="wrap" gap={2} justify="start">
                    {Object.values(uiConfigs?.borderConfigs || []).map((style, index) => {
                      return (
                        <Ui.BorderButton
                          key={`border_style_${index}`}
                          // color={selectedOptions?.object.style.background as string}
                          // borderColor={selectedOptions?.object.style.border.color as string}
                          borderStyle={style}
                          id={`object_style_border_${style}`}
                          onClick={onChangeObjectBorderStyle}
                          isActive={style === selectedOptions?.object.style.border.style}
                        />
                      );
                    })}
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
                {/* 객체 스타일 - 테두리 */}
                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>객체 테두리 두께</Ui.H5>
                  <Ui.Label>
                    설정
                    <Ui.LabelSpan>
                      <Ui.InputNumber
                        type="number"
                        name="object_border_width"
                        id="object_border_width"
                        inputMode="numeric"
                        value={selectedOptions?.object.style.border.width || 1}
                        min={0}
                        max={10}
                        onChange={onChangeObjectBorderWidth}
                      />
                    </Ui.LabelSpan>
                  </Ui.Label>
                </Ui.ToolbarOptions.Item>
                {/* 객체 스타일  */}
                {/* 객체 이동 설정 */}
              </Ui.ToolbarOptions.List>
            )}
          </Ui.TransitionWrapper>

          {/* 
          ===============================================================
                                 미리 보기 설정
          ===============================================================
        */}
          <Ui.Flex pl={16} pr={16}>
            <Ui.H3>미리보기</Ui.H3>
            <Ui.TransitionButton id={"preview"} isActive={previewActive} onClick={toggle}>
              <Icon.downTriArrow />
            </Ui.TransitionButton>
          </Ui.Flex>
          <Ui.Divider />

          <Ui.TransitionWrapper isActive={previewActive}>
            {previewActive && (
              <Ui.ToolbarOptions.List style={{ gap: "8px" }}>
                <Ui.ToolbarOptions.Item style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                  <Ui.H5>객체 미리보기</Ui.H5>
                  <Ui.Flex>
                    <Ui.PreviewBox
                      id={`object_preview`}
                      color={selectedOptions?.object.style.background}
                      borderWidth={selectedOptions?.object.style.border.width}
                      borderColor={selectedOptions?.object.style.border.color}
                      borderStyle={selectedOptions?.object.style.border.style}
                    />
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
              </Ui.ToolbarOptions.List>
            )}
          </Ui.TransitionWrapper>

          {/* 
          ===============================================================
                                 그룹 설정
          ===============================================================
        */}
          <Ui.Flex pl={16} pr={16}>
            <Ui.H3>그룹 설정</Ui.H3>
            <Ui.TransitionButton id={"group"} isActive={groupActive} onClick={toggle}>
              <Icon.downTriArrow />
            </Ui.TransitionButton>
          </Ui.Flex>
          <Ui.Divider />

          <Ui.TransitionWrapper isActive={groupActive}>
            {groupActive && (
              <Ui.ToolbarOptions.List style={{ gap: "8px" }}>
                <Ui.ToolbarOptions.Item>
                  <Ui.H5>객체 정렬</Ui.H5>
                  <Ui.Flex gap={2} justify="start" wrap="wrap">
                    <Ui.DefaultButton id="object_sort_top" value="top" onClick={onChangeObjectSorting}>
                      <Icon.TopSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton id="object_sort_left" value="left" onClick={onChangeObjectSorting}>
                      <Icon.LeftSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton id="object_sort_mid" value="mid" onClick={onChangeObjectSorting}>
                      <Icon.CenterSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton id="object_sort_right" value="right" onClick={onChangeObjectSorting}>
                      <Icon.RightSortIcon />
                    </Ui.DefaultButton>
                    <Ui.DefaultButton id="object_sort_bottom" value="bottom" onClick={onChangeObjectSorting}>
                      <Icon.BottomSortIcon />
                    </Ui.DefaultButton>
                  </Ui.Flex>
                </Ui.ToolbarOptions.Item>
              </Ui.ToolbarOptions.List>
            )}
          </Ui.TransitionWrapper>
        </div>
      )}
    </section>
  );
};

export default ToolbarContainer;
