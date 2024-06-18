/* eslint-disable react-hooks/rules-of-hooks */
import { fabric } from "fabric";
import React from "react";
import uuid from "react-uuid";

import { ObjectConfigsImageObject, ObjectConfigsTextBoxObject, ObjectConfigsVideoObject } from "@/configs";
import { CanvasModel } from "@/models";

type CanvasProps = CanvasModel<ObjectConfigsTextBoxObject, ObjectConfigsImageObject, ObjectConfigsVideoObject>;

export default function useVideoController<T extends CanvasProps>(canvas: T) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const onLoadMetadata = (canvas: T) => {
    if (!canvas) return;
    const videoElement = videoRef.current!;
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    videoElement.width = width;
    videoElement.height = height;

    _onLoadVideo(canvas);
  };

  React.useEffect(() => {
    if (!canvas) return;
    if (!videoRef.current) return;

    videoRef.current.addEventListener("loadedmetadata", () => onLoadMetadata(canvas!));

    // clean
    return () => {
      videoRef.current?.removeEventListener("loadedmetadata", () => onLoadMetadata(canvas!));
      videoRef.current?.pause();
      canvas.clearCanvas();
    };
  }, [canvas]);

  /**
   * ===================================================================================================================
   *                                          Private Functions
   * ===================================================================================================================
   */
  const _renderCanvas = (canvas: T) => {
    if (!canvas) return;
    canvas?.requestRenderAll();
    fabric.util.requestAnimFrame(() => _renderCanvas(canvas));
  };

  const _onLoadVideo = (canvas: T) => {
    if (!canvas) return;
    const videoElement = videoRef.current;
    videoElement?.play();

    // 예외처리1
    if (!videoElement) return;

    const videoModel = canvas?.createVideoModelByElement(videoElement!, {
      left: 100,
      top: 100,
      angle: 0,
      opacity: 1.0,
      objectId: uuid(),
    });

    // 예외처리3
    if (!videoModel) return;

    canvas.add(videoModel);

    _renderCanvas(canvas);
  };

  return videoRef as React.RefObject<HTMLVideoElement>;
}
