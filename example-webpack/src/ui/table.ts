import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Table = styled.table`
  width: 50%;
  height: 100%;
`;

const Tr = styled.tr<{
  isActive?: boolean;
}>`
  display: flex;
  gap: 8px;
  flex: 1;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: #f0f0f0;
        `
      : css`
          background-color: #fff;
        `}

  &:hover {
    background-color: #f0f0f0;
  }
`;

const THead = styled.thead`
  background-color: #eaeaea;
  cursor: pointer;

  width: 50%;
`;
const Th = styled.th`
  height: 40px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: transparent;
`;

const Tbody = styled.tbody`
  background-color: #fff;
  height: 100%;
`;
const Td = styled.td`
  text-align: left;
  height: 40px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 16px;
  cursor: pointer;
`;

export const BottomTable = {
  table: Table,
  tr: Tr,
  thead: THead,
  th: Th,
  tbody: Tbody,
  td: Td,
};
