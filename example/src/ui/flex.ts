import * as CSS from "csstype";
import styled from "@emotion/styled";

export type FlexProps = {
  direction?: CSS.Properties["flexDirection"];
  gap?: number;
  justify?: CSS.Properties["justifyContent"];
  align?: CSS.Properties["alignItems"];
  wrap?: CSS.Properties["flexWrap"];
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
};

export const Flex = styled.span<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "nowrap")};
  gap: ${({ gap }) => (gap ? gap + "px" : "4px")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  align-items: ${({ align }) => (align ? align : "center")};

  padding-left: ${({ pl }) => pl && pl + "px"};
  padding-right: ${({ pr }) => pr && pr + "px"};
  padding-top: ${({ pt }) => pt && pt + "px"};
  padding-bottom: ${({ pb }) => pb && pb + "px"};
`;
