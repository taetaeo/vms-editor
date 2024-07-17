import styled from "@emotion/styled";

export const InputRange = styled.input`
  height: 8px;
  -webkit-appearance: none;
  background: #fff;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #3c6ea4;
    border-radius: 50%;
    cursor: pointer;
  }

  &:focus::-webkit-slider-thumb {
    background: #3c6ea4; /* 포커스 상태일 때 thumb 색상 변경 */
  }
`;
export const InputNumber = styled.input`
  -webkit-appearance: none;
  outline: none;
  border: 0.5px solid #000;
  height: 100%;
  border: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  &::-webkit-inner-spin-button {
    -webkit-appearance: inner-spin-button;
    opacity: 1;
    background: #fff;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: inner-spin-button;
    opacity: 1;
    background: #fff;
  }
`;
