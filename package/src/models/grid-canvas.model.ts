type Theme = "dark" | "light";

type Parameters = {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;

  theme: Theme;
};

export default class GridCanvasModel {
  private canvas: HTMLCanvasElement;
  private theme: Theme;

  private width: number;
  private height: number;
  public context: CanvasRenderingContext2D;

  constructor(params: Parameters) {
    this.width = params.width;
    this.height = params.height;
    this.theme = params.theme;

    this.canvas = params.canvas;
    this.context = this.canvas.getContext("2d")!;
  }

  /**
   * @description 배경 테마 그리기
   * @param param0
   */
  public onDrawBackground({ lineWidth = 0.3 }) {
    this.context.save();
    this.context.fillStyle = this.isDarkMode() ? "#000" : "#fff";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = this.isDarkMode() ? "yellow" : "black";
    this.context.fillStyle = this.isDarkMode() ? "white" : "black";
  }

  /**
   * @description 수평선 그리기
   */
  public onDrawHorizon() {
    for (let i = 1; i < this.width; i++) {
      this.onDrawStart();
      if (i % 10 === 0) {
        this.moveRight(i);
        this.addHorizontalLine(i);
        this.moveRight(i);
      }
      this.onDrawEnd();
      this.onDrawStroke();
    }
  }

  /**
   * @description 수평선 간격 그리기
   * @param {number} interval - 간격의 구간
   * @param {number} height - 간격을 표시할 길이
   */

  public onDrawHorizonInterval(interval: number = 50, height: number = 30) {
    for (let i = interval; i < this.width; i += 10) {
      if (i % interval === 0) {
        this.moveRight(i);
        this.addHorizontalLine(i, height);
        this.onDrawHorizonIntervalText(i, height);
      } else {
        this.moveRight(i);
        this.addHorizontalLine(i, 10);
      }
    }
  }

  /**
   * @description 수직선 그리기
   */
  public onDrawVertical() {
    for (let i = 1; i < this.height; i++) {
      this.onDrawStart();
      if (i % 10 === 0) {
        this.moveBottom(i);
        this.addVerticalLine(i);
        this.moveBottom(i);
      }
      this.onDrawEnd();
      this.onDrawStroke();
    }
  }

  /**
   * @description 수직선 간격 그리기
   * @param {number} interval - 간격의 구간
   * @param {number} width  - 간격의 구간을 표시할 길이
   */
  public onDrawVerticalInterval(interval: number = 50, width: number = 30) {
    for (let i = interval; i < this.height; i += 10) {
      if (i % interval === 0) {
        this.moveBottom(i);
        this.addVerticalLine(i, width);
        this.onDrawVerticalIntervalText(i, width);
      } else {
        this.moveBottom(i);
        this.addVerticalLine(i, 10);
      }
    }
  }

  /**
   * @description 선 그리기 Start
   * @param param0
   */
  public onDrawLine({ width = 1, color = "gray" }) {
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
    this.onDrawStart();
  }

  /**
   * @description 선 그리기 End
   * @param param0
   */
  public onDrawDone({ isStart = false, isRestore = false }) {
    this.onDrawEnd();
    this.onDrawStroke();

    /** 그림시작 */
    if (isStart) {
      this.onDrawStart();
    }
    /** 그림 복원 */
    if (isRestore) {
      this.onDrawRestore();
    }
  }

  /**
   *  ======================================================
   *                            Private
   *  ======================================================
   */

  private onDrawRestore() {
    this.context.restore();
  }

  private onDrawEnd() {
    this.context.closePath();
  }

  private onDrawStart() {
    this.context.beginPath();
  }

  private onDrawStroke() {
    this.context.stroke();
  }

  private moveRight(to: number) {
    this.context.moveTo(to, 0);
  }
  private moveLeft(to: number) {
    this.context.moveTo(-to, 0);
  }
  private moveUp(to: number) {
    this.context.moveTo(0, -to);
  }
  private moveBottom(to: number) {
    this.context.moveTo(0, to);
  }

  private addHorizontalLine(line: number, height = this.height) {
    this.context.lineTo(line, height);
  }
  private addVerticalLine(line: number, width = this.width) {
    this.context.lineTo(width, line);
  }

  private onDrawHorizonIntervalText(interval: number, height: number) {
    this.context.fillText(` ${interval}`, interval, height);
  }
  private onDrawVerticalIntervalText(interval: number, height: number) {
    this.context.fillText(` ${interval}`, height, interval);
  }

  private isDarkMode() {
    return this.theme === "dark";
  }
}
