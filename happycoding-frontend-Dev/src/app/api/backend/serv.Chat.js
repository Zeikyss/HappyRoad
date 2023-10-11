import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:4050')
;
export default socket;