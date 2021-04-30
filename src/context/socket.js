import React from "react";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);
export const SocketContext = React.createContext({socket});
