"use strict";
import { fabric } from "fabric";

/**
 * fabric.Line 객체를 생성할 때 사용하는 points 파라미터에서 x1, y1, x2, y2의 기준은 각각 선의 시작점과 끝점의 좌표를 의미합니다. 이 좌표들은 캔버스의 좌표계를 기준으로 합니다. 캔버스의 좌표계는 다음과 같이 정의됩니다:
 *
 * 원점(0, 0)은 캔버스의 왼쪽 상단 모서리에 있습니다.
 * x축은 오른쪽으로 증가합니다.
 * y축은 아래쪽으로 증가합니다.
 *
 * 좌표의 의미
 * x1, y1: 선의 시작점의 x좌표와 y좌표.
 * x2, y2: 선의 끝점의 x좌표와 y좌표.
 */

/**
 * 사각형 왼쪽 상단 꼭지점 (left, top)
 * 사각형 오른쪽 상단 꼭지점 (right, top)
 * 사각형 왼쪽 하단 꼭지점 (left, bottom)
 * 사각형 오른쪽 하단 꼭지점 (right, bottom)
 */

/**
 *     P (기준점)
 *       (0,0)
 *        ┌──────────────────────┐
 *        │                      │
 *        │                      │
 *        │                      │
 *        │         (x,y)        │
 *        │                      │
 *        │                      │
 *        └──────────────────────┘
 *
 * (left, top)                    (right, top)
 *        ┌──────────────────────┐
 *        │                      │
 *        │                      │
 *        │                      │
 *        │         (x,y)        │
 *        │                      │
 *        │                      │
 *        └──────────────────────┘
 * (left, bottom)              (right, bottom)
 *
 *
 */
// new fabric.Line([x1, y1, x2, y2], options);

type Parameters = {
  start: { x1: number; y1: number };
  end: { x2: number; y2: number };
};
export default class LineLayoutModel extends fabric.Line {
  public start: { x1: number; y1: number } = { x1: 0, y1: 0 };
  public end: { x2: number; y2: number } = { x2: 0, y2: 0 };
  public options: any = {};

  constructor(params: Parameters, options?: any) {
    super();
    this.start = params.start;
    this.end = params.end;
    this.options = options;
    new fabric.Line([params.start.x1, params.start.y1, params.end.x2, params.end.y2], {
      stroke: "#fff",
      strokeWidth: 0.1,
      selectable: false,
      strokeDashArray: [0.5, 0.5],
      ...options,
    });
  }
}
