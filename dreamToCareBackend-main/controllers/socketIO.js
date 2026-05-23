import { Server } from "socket.io";

let _io;
let sockets = [];

export const setIO = (server) => {
    _io = new Server(server, {
        cors: {
            origin: "*",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
    })
    return _io
}

export const getIO = () => {
    return _io
}

export const setSocket = (socket) => {
    sockets.push(socket);
};

export const delSocket = (socket) => {
    sockets = sockets.filter(({ id }) => id !== socket.id);
};

export const getSockets = () => {
    return sockets
}