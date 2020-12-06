import { io } from 'socket.io-client';
import api from 'src/api';
import history from 'src/router/history';

const socket = io(
  `wss://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
);

socket.on('disconnect', (reason: string) => {
  if (reason === 'io server disconnect') {
    (async () => {
      if (history.location.pathname !== '/login') {
        const { status, data } = await api.get('auth/socket');

        if (status !== 401) {
          (socket.io as any).opts.query = {
            oid: data.oid,
            token: data.token,
          };
        }
      }

      socket.connect();
    })();
  }
});

export default socket;
