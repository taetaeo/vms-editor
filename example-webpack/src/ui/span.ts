import styled from "@emotion/styled";

export const DefaultSpan = styled.span`
  font-weight: 700;
`;

export const LabelSpan = styled(DefaultSpan)``;

export const ButtonSpan = styled(DefaultSpan)<{ gap?: number }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => (gap ? gap + "px" : "4px")};
  justify-content: center;
  align-items: center;
`;
