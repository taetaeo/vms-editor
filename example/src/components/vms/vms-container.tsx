import type { CSSProperties, Dispatch, PropsWithChildren, SetStateAction } from "react";
import React from "react";
import { CanvasModel, ObjectConfigsImageObject, ObjectConfigsTextObject, ObjectConfigsVideoObject, canvasConfigs, objectConfigs, useToolbar } from "vms-editor";
import GridCanvasContainer from "../canvas/gridCanvas";
import MainCanvasContainer from "../canvas/mainCanvas";
import ToolbarContainer from "../toolbar/mainToolbar";

type CanvasProps = CanvasModel<ObjectConfigsTextObject, ObjectConfigsImageObject, ObjectConfigsVideoObject> | null;
type Props = {
  canvas?: CanvasProps;
  setCanvas?: Dispatch<SetStateAction<CanvasProps>>;
  onChange?: () => void;
};

const VmsContainer = ({ canvas = null, setCanvas = () => {}, children, ...rest }: PropsWithChildren<Props>) => {
  let newCanvas: CanvasModel<ObjectConfigsTextObject, ObjectConfigsImageObject, ObjectConfigsVideoObject>;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const { selectedOptions, callbackFn } = useToolbar();

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key) {
      case "Delete":
        newCanvas.onDeleteSelectedObjects();
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (canvasRef.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      newCanvas = new CanvasModel({
        current: canvasRef.current,
        configs: canvasConfigs.lg,
        selectedUpdatedFn: callbackFn as <T>(objects: T) => void,
      });
    }

    if (!newCanvas) return;

    newCanvas.getCanvasContext();

    newCanvas.onSettingConfig(objectConfigs);

    document.addEventListener("keydown", handleKeyDown);

    setCanvas(newCanvas);

    return () => {
      if (canvas) {
        document.removeEventListener("keydown", handleKeyDown);
        newCanvas.onDismissCanvas();
        setCanvas(null);
      }
    };
  }, []);

  return (
    <>
      <div style={ContainerStyle}>
        <button className="vms-editor__color-button" style={{ background: "white", width: "auto" }}>
          데이터 추출
        </button>
      </div>
      <main className="vms-editor____main-wrapper">
        <section className="vms-editor__default-wrapper">
          <GridCanvasContainer id="grid-canvas" theme={"dark"} width={window.innerWidth * 0.7} height={window.innerHeight * 0.7} />
          <MainCanvasContainer id="fabric-canvas" ref={canvasRef!} />
        </section>

        <ToolbarContainer canvas={canvas} />
      </main>
    </>
  );
};

export default VmsContainer;

const ContainerStyle: CSSProperties = { position: "fixed", top: 0, left: 0, width: "100vw", justifyContent: "start", display: "flex", gap: "4px" };
