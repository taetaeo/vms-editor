import type { FC, PropsWithChildren } from "react";
import React from "react";
import { useEffect, useRef } from "react";
import { GridLayout, Theme } from "vms-editor";

type Props = {
  id?: string;
  theme: Theme;
  width: number;
  height: number;
};

const GridCanvasContainer: FC<PropsWithChildren<Props>> = (props) => {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!gridCanvasRef.current) return;

    /** 그리그 캔버스 생성자  */
    const grid = new GridLayout({
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: gridCanvasRef.current,
      theme: props.theme,
    });
    /** 배경 그리기 */
    grid.onDrawBackground({ lineWidth: 0.3 });

    /** 수평선 이동 */
    grid.onDrawHorizon();
    /** 선 그리기 */
    grid.onDrawLine({ width: 1, color: "gray" });
    /** 수직선 이동 */
    grid.onDrawVertical();

    /** 수평선 간격 그리기 */
    grid.onDrawHorizonInterval();
    /** 그리기 종료 */
    grid.onDrawDone({ isStart: true, isRestore: false });

    /** 수직선 간격 그리기 */
    grid.onDrawVerticalInterval();
    /** 그리기 종료 */
    grid.onDrawDone({ isStart: false, isRestore: true });
  }, []);

  return <canvas ref={gridCanvasRef!} id={props.id} width={props.width} height={props.height} />;
};

export default GridCanvasContainer;
