import { createAction } from "@reduxjs/toolkit";
import { ISocketOrder } from "../types";

export const WS_CONNECT: "WS_CONNECT" = "WS_CONNECT";

export const WS_DISCONNECT: "WS_DISCONNECT" = "WS_DISCONNECT";
export const WS_CONNECTING: "WS_CONNECTING" = "WS_CONNECTING";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_OPEN: "WS_OPEN" = "WS_OPEN";
export const WS_CLOSE: "WS_CLOSE" = "WS_CLOSE";
export const WS_MESSAGE: "WS_MESSAGE" = "WS_MESSAGE";
export const WS_ERROR: "WS_ERROR" = "WS_ERROR";

export const wsConnect = createAction<string, typeof WS_CONNECT>(WS_CONNECT);
export const wsDisconnect = createAction<string, typeof WS_DISCONNECT>(
  WS_DISCONNECT,
);
export const wsConnecting = createAction(WS_CONNECTING);
export const wsSendMessage = createAction(WS_SEND_MESSAGE);
export const onOpen = createAction(WS_OPEN);
export const onClose = createAction(WS_CLOSE);
export const onMessage = createAction<ISocketOrder, typeof WS_MESSAGE>(
  WS_MESSAGE,
);
export const onError = createAction<string, typeof WS_ERROR>(WS_ERROR);

export type TWSActionsType =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onClose>
  | ReturnType<typeof onError>
  | ReturnType<typeof onMessage>
  | ReturnType<typeof wsSendMessage>;

export const TWSActions = {
  wsConnect,
  wsConnecting,
  wsDisconnect,
  onOpen,
  onMessage,
  onClose,
  onError,
  wsSendMessage,
};
