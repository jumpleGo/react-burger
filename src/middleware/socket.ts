import type { Middleware, MiddlewareAPI } from "redux";

import { RootState } from "../services/store";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { IResponseSocketMessage, ISocketOrder } from "../services/types";
import { WS_CONNECTING } from "../services/actions/socket";
import { WS_USER_CONNECTING } from "../services/actions/userSocket";

export type TwsActionTypes = {
  wsConnecting: ActionCreatorWithoutPayload<
    "WS_CONNECTING" | "WS_USER_CONNECTING"
  >;
  onClose: ActionCreatorWithoutPayload<"WS_CLOSE" | "WS_USER_CLOSE">;
  onError: ActionCreatorWithPayload<string, "WS_ERROR" | "WS_USER_ERROR">;
  onOpen: ActionCreatorWithoutPayload<"WS_OPEN" | "WS_USER_OPEN">;
  wsSendMessage: ActionCreatorWithoutPayload<
    "WS_SEND_MESSAGE" | "WS_USER_SEND_MESSAGE"
  >;
  wsDisconnect: ActionCreatorWithoutPayload<
    "WS_DISCONNECT" | "WS_USER_DISCONNECT"
  >;
  onMessage: ActionCreatorWithPayload<
    IResponseSocketMessage,
    "WS_MESSAGE" | "WS_USER_MESSAGE"
  >;
  wsConnect: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
  wsActions: TwsActionTypes,
): Middleware<{}, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";
    return (next) => (action) => {
      console.log(action);
      const { dispatch } = store;
      const {
        wsConnecting,
        wsConnect,
        onError,
        onOpen,
        onMessage,
        wsSendMessage,
        wsDisconnect,
        onClose,
      } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        // объект класса WebSocket
        socket = new WebSocket(url);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          console.log("open");
          dispatch(onOpen());
          isConnected = true;
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          console.log(event);
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());
          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsConnect.match(wsSendMessage)) {
          console.log(action);
          const payload = action.payload;
          const message = { ...payload };
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  }) as Middleware;
};
