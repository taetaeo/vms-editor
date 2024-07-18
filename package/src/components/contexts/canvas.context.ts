import type { Dispatch, SetStateAction } from "react";
import React from "react";

import type { CanvasModelType } from "../../types";

type CanvasEventHandler = (canvas: CanvasModelType) => void;

type CanvasCtxStateType = { canvas: CanvasModelType; setCanvas: Dispatch<SetStateAction<CanvasModelType>> };

type CanvasCtxOnChangeType = {
  keyDown: (cavas: CanvasModelType, event: KeyboardEvent) => void;
  addKeydownEventListener: CanvasEventHandler;
  removeKeydownEventListener: CanvasEventHandler;
  addMouseEventListener: CanvasEventHandler;
  removeMouseEventListener: CanvasEventHandler;
  addMouseContextMenuEventListener: CanvasEventHandler;
  removeMouseContextMenuEventListener: CanvasEventHandler;
};
type EventObjectType = { menuVisible: boolean; menuPosition: { x: number; y: number } };

type CanvasCtxHandler = { onCloseMenu: () => void };

export type CanvasContextType = CanvasCtxStateType & { onchange?: CanvasCtxOnChangeType } & { eventObject?: EventObjectType } & { handler?: CanvasCtxHandler };

const eventObject = { menuVisible: false, menuPosition: { x: 0, y: 0 } };

export default React.createContext<CanvasContextType>({ canvas: null, setCanvas: () => {}, onchange: undefined, handler: undefined, ...eventObject });
