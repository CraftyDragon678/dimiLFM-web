import { io } from 'socket.io-client';
import api from 'src/api';

const socket = io(
  `wss://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
);

socket.on('disconnect', (reason: string) => {
  if (reason === 'io server disconnect') {
    (async () => {
      const { status, data } = await api.get('/auth/socket');

      if (status !== 401) {
        // @ts-ignore
        socket.io.opts.query = {
          oid: data.oid,
          token: data.token,
        };
      }

      socket.connect();
    })();
  }
});

export default socket;
