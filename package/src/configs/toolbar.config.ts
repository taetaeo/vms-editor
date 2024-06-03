/** 툴바의 기본 폰트 선택 옵션 */
const fontSizes = {
  "8": 8,
  "9": 9,
  "10": 9,
  "11": 11,
  "12": 12,
  "14": 14,
  "16": 16,
  "18": 18,
  "20": 20,
  "24": 24,
  "28": 28,
  "32": 32,
  "36": 36,
  "40": 40,
  "44": 44,
  "48": 48,
  "54": 54,
  "60": 60,
  "66": 66,
  "72": 72,
  "96": 96,
} as const;

/** 툴바의 기본 색상 선택 옵션 */
const colors = {
  none: "none",
  white: "white",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  navy: "navy",
  purple: "purple",
  black: "black",
  more: "more",
} as const;

const borders = {
  none: "none",
  solid: "solid",
  dashed: "dashed",
  double: "double",
  dotted: "dotted",
} as const;

/**
 * Toolbar 선택 옵션 타입
 * */
export type ToolbarConfigsFontSizes = typeof fontSizes;
export type ToolbarConfigsColors = typeof colors;
export type ToolbarConfigsBorder = typeof borders;
export type ToolbarConfigs = { fontSizes: typeof fontSizes; colors: typeof colors; borders: typeof borders };

export default { fontSizes, colors, borders };
