import { createAction } from "@reduxjs/toolkit";
import { IResponseSocketMessage, ISocketOrder } from "../types";

export const WS_USER_CONNECT: "WS_USER_CONNECT" = "WS_USER_CONNECT";

export const WS_USER_DISCONNECT: "WS_USER_DISCONNECT" = "WS_USER_DISCONNECT";
export const WS_USER_CONNECTING: "WS_USER_CONNECTING" = "WS_USER_CONNECTING";
export const WS_USER_SEND_MESSAGE: "WS_USER_SEND_MESSAGE" =
  "WS_USER_SEND_MESSAGE";
export const WS_USER_OPEN: "WS_USER_OPEN" = "WS_USER_OPEN";
export const WS_USER_CLOSE: "WS_USER_CLOSE" = "WS_USER_CLOSE";
export const WS_USER_MESSAGE: "WS_USER_MESSAGE" = "WS_USER_MESSAGE";
export const WS_USER_ERROR: "WS_USER_ERROR" = "WS_USER_ERROR";

export const wsConnect = createAction<string, typeof WS_USER_CONNECT>(
  WS_USER_CONNECT,
);
export const wsDisconnect = createAction(WS_USER_DISCONNECT);
export const wsConnecting = createAction(WS_USER_CONNECTING);
export const wsSendMessage = createAction(WS_USER_SEND_MESSAGE);
export const onOpen = createAction(WS_USER_OPEN);
export const onClose = createAction(WS_USER_CLOSE);
export const onMessage = createAction<
  IResponseSocketMessage,
  typeof WS_USER_MESSAGE
>(WS_USER_MESSAGE);
export const onError = createAction<string, typeof WS_USER_ERROR>(
  WS_USER_ERROR,
);

export type TWSActionsUserType =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsDisconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onClose>
  | ReturnType<typeof onError>
  | ReturnType<typeof onMessage>
  | ReturnType<typeof wsSendMessage>;

export const TWSUserActions = {
  wsConnect,
  wsConnecting,
  wsDisconnect,
  onOpen,
  onMessage,
  onClose,
  onError,
  wsSendMessage,
};
