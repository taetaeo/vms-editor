import { useEffect } from "react";

// Types
import type { ImageObject } from "../types";
// Handler
import { useCanvasCtxHandler } from "../shared/handlers";
// Hooks
import { useMultiState } from "../shared/hooks";
// Constants
import { IMAGE_SELECTOR_CONST_KEY } from "../shared/enums";

export default function useImageSelectorController<T>() {
  const { canvas } = useCanvasCtxHandler();

  const [imageObject, setValue] = useMultiState<ImageObject<T>>({ src: "", alt: "" });

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
    _clearSrc();
    _clearAlt();
  };

  /**
   * @description 드래그를 통해 이미지 가져오기
   */

  useEffect(() => {
    if (!imageObject.src) return;

    const { src, alt } = imageObject;

    canvas?.getSelectedImage(src, alt || "", onclearValue!);
  }, [imageObject]);

  /**
   * =================================== < Inner Functions > ===================================
   */

  /**
   * @description 삭제 -  src 상태
   */
  const _clearSrc = () => {
    setValue({ name: IMAGE_SELECTOR_CONST_KEY.src, value: "" });
  };

  /**
   * @description 삭제 -  alt 상태
   */

  const _clearAlt = () => {
    setValue({ name: IMAGE_SELECTOR_CONST_KEY.alt, value: "" });
  };

  /**
   * =================================== </ Inner Functions > ===================================
   */

  return {
    imageObject,
    onchangeValue,
    onclearValue,
  };
}
