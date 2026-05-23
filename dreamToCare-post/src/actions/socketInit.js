import { io } from "socket.io-client";
let socket;
export const initSocket = (auth, dispatch) => {
    socket = io("http://localhost:8000", {
        query: { userId: auth.id }
    });
    socket.on('notificationReceived', (status) => {
        !!status && dispatch(gotNotificationAction());
    });
}

export const gotNotificationAction = () => {
    return {
        type: 'GOT_NOTIFICATION',
      };
}

export const readNotificationAction = () => {
    return {
        type: 'READ_NOTIFICATION',
      };
}