/* eslint-disable react-hooks/rules-of-hooks */
import { fabric } from "fabric";
import React from "react";
import uuid from "react-uuid";

// Configs
import type { ObjectConfigsImageObject, ObjectConfigsTextBoxObject, ObjectConfigsVideoObject } from "../configs";
// Handlers
import { useCanvasCtxHandler } from "../shared/handlers";
// Models
import { CanvasModel } from "../models";

type CanvasProps = CanvasModel<ObjectConfigsTextBoxObject, ObjectConfigsImageObject, ObjectConfigsVideoObject>;

export default function useVideoController() {
  const { canvas } = useCanvasCtxHandler();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  /**
   * =================================== < Outer Functions > ===================================
   */

  const onLoadMetadata = (canvas: CanvasProps) => {
    const $videoEl = videoRef.current!;
    const width = $videoEl.videoWidth;
    const height = $videoEl.videoHeight;
    $videoEl.width = width;
    $videoEl.height = height;

    _onLoadVideo(canvas);
  };

  /**
   * =================================== </ Outer Functions > ===================================
   */
  React.useEffect(() => {
    if (!canvas) return;
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadedmetadata", () => onLoadMetadata(canvas! as CanvasProps));

    // clean
    return () => {
      videoRef.current?.removeEventListener("loadedmetadata", () => onLoadMetadata(canvas! as CanvasProps));
      videoRef.current?.pause();
      // canvas.clearCanvas();
    };
  }, [canvas]);

  /**
   * =================================== < Inner Functions > ===================================
   */

  // Canvas Render
  const _renderCanvas = (canvas: CanvasProps) => {
    if (!canvas) return;
    canvas?.requestRenderAll();
    fabric.util.requestAnimFrame(() => _renderCanvas(canvas));
  };

  // Video Load
  const _onLoadVideo = (canvas: CanvasProps) => {
    if (!canvas) return;
    const $videoEl = videoRef.current;
    $videoEl?.play();

    // 예외처리1
    if (!$videoEl) {
      return;
    }

    const videoModel = canvas?.createVideoModelByElement($videoEl!, {
      left: 100,
      top: 100,
      angle: 0,
      opacity: 1.0,
      objectId: uuid(),
    });

    // 예외처리3
    if (!videoModel) {
      return;
    }

    canvas.add(videoModel);

    _renderCanvas(canvas);
  };

  /**
   * =================================== </ Inner Functions > ===================================
   */
  return videoRef as React.RefObject<HTMLVideoElement>;
}
