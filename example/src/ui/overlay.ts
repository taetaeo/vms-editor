import styled from "@emotion/styled";

export const Overlay = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100%;
  max-height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
  z-index: 3; /* 오버레이가 다른 요소들 위에 나타나도록 */
  display: flex;
  justify-content: center;
  align-items: center;
`;
