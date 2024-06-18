import styled from "@emotion/styled";

export const DefaultWrapper = styled.section`
  /* position: relative; */
  margin: auto;
`;

export const ToolbarWrapper = styled.section<{
  isActive?: boolean;
}>`
  width: 360px;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  box-sizing: border-box;

  width: ${({ isActive }) => (isActive ? "360px" : "50px")};
  background-color: ${({ isActive }) => (isActive ? "rgba(255, 255, 255, 0.8)" : "none")};

  backdrop-filter: blur(5px); /* 흐린 효과 */
  z-index: 99; /* 다른 요소 위에 표시되도록 z-index 설정 */
  /* box-shadow: -5px -5px 30px 5px #000, 5px 5px 30px 5px #000; */

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const EditorWrapper = styled.section``;

export const MainWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 16px;
  background-color: #444442;
  box-sizing: border-box;
`;
export const BottomWrapper = styled.section``;

export const TransitionWrapper = styled.span<{
  isActive: boolean;
}>`
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  background-color: #eaeaea;
  width: auto;
  height: auto;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: bold;
`;

export const LoadingWrapper = styled.div<{ w: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: ${({ w }) => (w ? `${w}%` : "100%")};
`;
