import styled from "@emotion/styled";

const ToolbarList = styled.ul`
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 8px auto;
`;

const ToolbarListItem = styled.li`
  list-style: none;
  padding: 2px;
  height: 100%;
  /* width: auto; */
`;

export const ToolbarOptions = {
  List: ToolbarList,
  Item: ToolbarListItem,
};
