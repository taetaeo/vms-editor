import { useEffect } from "react";

// Functions - Contexts, hooks
import { useCanvasContext, useMultiState } from "../functions";

// Constants
import { IMAGE_SELECTOR_CONST_KEY } from "../enums";

// Types
import { ImageObject } from "../types";

export default function useImageSelectorController<T>() {
  const { canvas } = useCanvasContext();

  const [imageObject, setValue] = useMultiState<ImageObject<T>>({
    src: "",
    alt: "",
  });

  /**
   * @event 업데이트 imageObject 상태관리 이벤트
   * @param name 상태관리 키(Key)
   * @param value 갱신할 값(Value)
   */
  const onchangeValue = (name: IMAGE_SELECTOR_CONST_KEY, value: unknown) => {
    setValue({ name, value });
  };

  /**
   * @event 삭제 imageObject 상태관리 삭제 이벤트
   */
  const onclearValue = () => {
    private_clear_src();
    private_clear_alt();
  };

  /**
   * @description 드래그를 통해 이미지 가져오기
   */

  useEffect(() => {
    const { src, alt } = imageObject;

    if (!src) return;

    canvas?.getSelectedImage(src, alt || "", onclearValue!);
  }, [imageObject]);

  /**
   * ==============================================================================
   *                                    Private
   * ==============================================================================
   */

  /**
   * @description 삭제 -  src 상태
   */
  const private_clear_src = () => {
    setValue({ name: IMAGE_SELECTOR_CONST_KEY.src, value: "" });
  };

  /**
   * @description 삭제 -  alt 상태
   */

  const private_clear_alt = () => {
    setValue({ name: IMAGE_SELECTOR_CONST_KEY.alt, value: "" });
  };

  return {
    imageObject,
    onchangeValue,
    onclearValue,
  };
}
