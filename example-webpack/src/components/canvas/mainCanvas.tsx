import type { Ref } from "react";
import React from "react";

type Props = {
  id?: string;
};

const MainCanvasContainer = React.forwardRef(function Container(props: Props, forwardRef: Ref<HTMLCanvasElement>) {
  const handleDropOutside = (event: React.DragEvent<HTMLCanvasElement>) => {
    console.log("Drop detected outside from ~"); // 다른 요소에서 드롭 감지 메시지 출력
    event.preventDefault(); // 기본 이벤트 방지
    const data = event.dataTransfer.getData("text/plain"); // 드롭된 데이터 가져오기
    console.log("Dropped data:", data); // 드롭된 데이터 콘솔에 출력
    // 다른 요소에서 드롭된 데이터에 대한 처리 로직 추가
  };

  return (
    <canvas
      id={props.id}
      ref={forwardRef!}
      onDrop={(e) => {
        if (handleDropOutside && typeof handleDropOutside === "function") {
          handleDropOutside(e);
        }
      }}
    />
  );
});

export default MainCanvasContainer;
