const textObjectConfig = {
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

const imageObjectConfig = {
  objectId: true, // 객체 아이디
  width: true,
  height: true,
  src: true,
  styles: true,
};
const videoObjectConfig = {
  objectId: true, // 객체 아이디
  width: true, // 너비
  height: true, // 노비
  src: true, // 파일 경로
  styles: true, // 스타일
  aCoords: true, //
  fill: true, // 색상
  angle: true, //각도
  stroke: true, // 윤곽선
  cacheWidth: true, // 캐시 너비
  cacheHeight: true, // 캐시 높이
  opacity: true,
};

const objectConfigs = {
  textObjectConfig,
  imageObjectConfig,
  videoObjectConfig,
};
export default objectConfigs;

export type ObjectConfigs = typeof objectConfigs;
export type ObjectConfigsTextObject = ObjectConfigs["textObjectConfig"];
export type ObjectConfigsTextBoxObject = ObjectConfigs["textObjectConfig"];
export type ObjectConfigsImageObject = ObjectConfigs["imageObjectConfig"];
export type ObjectConfigsVideoObject = ObjectConfigs["videoObjectConfig"];
