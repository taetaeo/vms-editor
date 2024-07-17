import styled from "@emotion/styled";

export const DefaultButton = styled.button<{
  isActive?: boolean;
  w?: number;
}>`
  background-color: #f1f1f1;
  position: relative;
  display: inline-block;
  height: 100%;
  font-size: 14px;
  transition: all 0.3s ease;
  border-radius: 0;

  width: ${({ w }) => (w ? w + "px" : "auto")};

  box-shadow: ${({ isActive }) => (isActive ? "inset 0 0 4px" : " 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)")};

  &:active {
    transform: scale(0.9);
  }
`;

export const ColorButton = styled.button<{
  color: string;
  isActive?: boolean;
}>`
  background-color: ${({ color }) => color};
  background-image: ${({ color }) => color === "none" && "linear-gradient(to top left, transparent 49%, red 50%, red 51%, transparent 52%)"};

  width: 2%;
  height: 2%;
  border-radius: 0;
  border: 1px solid #eaeaea;

  box-shadow: ${({ isActive }) => isActive && "inset 0 0 4px"};

  &:active {
    transform: scale(0.9);
  }
`;

export const BorderButton = styled.button<{
  color?: string;
  borderStyle?: string;
  isActive?: boolean;
  borderColor?: string;
}>`
  background-color: white;
  width: 2%;
  height: 2%;
  border-radius: 0;
  border-width: 0.5px;
  background-color: ${({ color }) => color ?? "#fff"};
  border-style: ${({ borderStyle }) => borderStyle};
  border-color: ${({ borderColor }) => borderColor ?? "#000"};
  box-shadow: ${({ isActive }) => isActive && "inset 0 0 4px"};

  border: ${({ borderStyle }) => borderStyle === "none" && "none"};
  background-image: ${({ borderStyle }) => borderStyle === "none" && "linear-gradient(to top left, transparent 49%, red 50%, red 51%, transparent 52%)"};

  &:active {
    transform: scale(0.9);
  }
`;

export const TransitionButton = styled.button<{
  isActive?: boolean;
}>`
  outline: none;
  padding: 4px;
  background-color: transparent;

  transform: ${({ isActive }) => (isActive ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;

  &:focus {
    outline: none;
  }
`;
