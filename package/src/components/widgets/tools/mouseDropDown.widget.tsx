import * as R from "react";

import type { CanvasModelType } from "../../../types";
import { classNames as cn } from "../../../shared/lib/utils";
import { useCanvasCtxHandler } from "../../../shared/handlers";
import { CanvasContextType } from "../../contexts";

interface Props extends R.HTMLAttributes<HTMLElement>, R.PropsWithChildren {
  canvas?: CanvasModelType;
  isVisible?: boolean;
  positionX?: number;
  positionY?: number;
}

const MouseDropDownWidget: R.FC<Props> = (
  // Props
  { className = "mouse-dropdown-menu", isVisible = false, positionX, positionY }
) => {
  const canvasCtx = useCanvasCtxHandler();

  R.useEffect(() => {
    const menuItems = document.getElementsByClassName("dropdown-menu-item");

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    for (let i = 0; i < menuItems.length; i++) {
      (menuItems[i] as HTMLLIElement).addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      for (let i = 0; i < menuItems.length; i++) {
        (menuItems[i] as HTMLLIElement).removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, []);

  if (!positionX || !positionY) return null;

  const handleSelectAll = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    alert("개발중");
    _close(canvasCtx);
  };

  const handleUndo = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    alert("개발중");
    _close(canvasCtx);
  };

  const handleGetData = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    _getData(canvasCtx);
    _close(canvasCtx);
  };

  const handleExtract = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    _extractUrl(canvasCtx);
    _close(canvasCtx);
  };

  const handleBringFront = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    _bringFront(canvasCtx);
    _close(canvasCtx);
  };

  const handleBringBack = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    _bringBack(canvasCtx);
    _close(canvasCtx);
  };

  const handlePreviewLarge = () => {
    if (!_isCheckCanvas(canvasCtx)) return;
    alert("개발중");
    _close(canvasCtx);
  };

  /**
   *  ======================================= <Inner Functions>  ======================================
   */

  const _isCheckCanvas = (ctx: CanvasContextType) => {
    if (ctx.canvas) return true;
    return false;
  };

  const _bringFront = (ctx: CanvasContextType) => {
    const selectedObjects = ctx.canvas?.selectedObjects;
    selectedObjects?.forEach((object) => canvasCtx.canvas?.bringToFront(object));
  };

  const _bringBack = (ctx: CanvasContextType) => {
    const selectedObjects = ctx.canvas?.selectedObjects;
    selectedObjects?.forEach((object) => canvasCtx.canvas?.sendToBack(object));
  };

  const _extractUrl = (ctx: CanvasContextType, format = "image/png") => {
    const dataUrl = ctx.canvas?.toDataURL({ format });
    return dataUrl;
  };

  const _getData = (ctx: CanvasContextType) => {
    const objectList = ctx.canvas?.getObjectMatchingConfigs();
    return objectList;
  };

  const _close = (ctx: CanvasContextType) => {
    ctx.handler?.onCloseMenu();
  };

  /**
   *  ======================================= </Inner Functions>  ======================================
   */

  return (
    <>
      <div className={cn(className, { visible: isVisible })} style={{ top: positionY, left: positionX }}>
        <ul>
          <li className={cn(`${className}-item`)} onClick={handleSelectAll}>
            전체 선택
          </li>
          <li className={cn(`${className}-item`)} onClick={handleUndo}>
            실행취소
          </li>
          <li className={cn(`${className}-item`)} onClick={handleGetData}>
            데이터 가져오기
          </li>
          <li className={cn(`${className}-item`)} onClick={handleExtract}>
            데이터 내보내기
          </li>
          <li className={cn(`${className}-item`)} onClick={handleBringFront}>
            맨 앞으로 이동
          </li>
          <li className={cn(`${className}-item`)} onClick={handleBringBack}>
            맨 뒤로 이동
          </li>
          <li className={cn(`${className}-item`)} onClick={handlePreviewLarge}>
            확대 미리 보기
          </li>
        </ul>
      </div>
    </>
  );
};

export default MouseDropDownWidget;
