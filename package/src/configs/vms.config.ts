export type BackgroundTheme = typeof vmsBackgroundTheme;
export type VmsConfigs = { theme: BackgroundTheme };

const vmsBackgroundTheme = {
  transplant: "transplant",
  black: "black",
  white: "white",
  gray: "gray",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  navy: "navy",
  purple: "purple",
} as const;

const vmsConfigs = {
  theme: vmsBackgroundTheme,
} as const;

export default vmsConfigs;
