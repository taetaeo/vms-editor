const canvasConfigs = {
  md: { height: 500, width: 500, backgroundColor: "transparent" },
  lg: { height: window.innerHeight * 0.8, width: window.innerWidth * 0.8, backgroundColor: "transparent" },
};

export type CanvasConfigs = (typeof canvasConfigs)[keyof typeof canvasConfigs];
export default canvasConfigs;
