import styled from "@emotion/styled";

export const ToolbarOptionsBox = styled.div`
  padding: 8px;
  width: auto;
`;

export const PreviewBox = styled.div<{
  color?: string;
  borderStyle?: string;
  borderColor?: string;
  borderWidth?: number;
}>`
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 0;
  border-width: ${({ borderWidth }) => borderWidth + "px"};
  background-color: ${({ color }) => color || "#fff"};
  border-style: ${({ borderStyle }) => borderStyle};
  border-color: ${({ borderColor }) => borderColor || "#fff"};

  border: ${({ borderStyle }) => borderStyle === "none" && "none"};
  box-sizing: border-box;
`;
