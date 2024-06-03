const textObjectConfigs = {
  objectId: true, // 객체 아이디
  width: true, // 너비
  height: true, // 높이
  text: true, // 텍스트
  color: true, // 색상
  fontWeight: true, // 굵기
  cacheHeight: true, // 변화된 높이
  cacheWidth: true, // 변화된 너비
  fontSize: true, // 폰트 사이즈
  left: true, // X좌표
  top: true, // Y좌표
  backgroundColor: true, // 배경 색상
  stroke: true,
  strokeDashArray: true,
  strokeWidth: true,
  styles: true,
};

const imageObjectConfig = { width: true, height: true, src: true, styles: true };
const videoObjectConfig = { width: true, height: true, url: true, styles: true };

const objectConfigs = {
  textObjectConfigs,
  imageObjectConfig,
  videoObjectConfig,
};
export default objectConfigs;

export type ObjectConfigs = typeof objectConfigs;
export type ObjectConfigsTextObject = ObjectConfigs["textObjectConfigs"];
export type ObjectConfigsTextBoxObject = ObjectConfigs["textObjectConfigs"];
export type ObjectConfigsImageObject = ObjectConfigs["imageObjectConfig"];
export type ObjectConfigsVideoObject = ObjectConfigs["videoObjectConfig"];
