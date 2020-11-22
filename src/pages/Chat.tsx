import React, { useEffect, useRef } from 'react';
import api from '../api';

export default () => {
  const ws = useRef<WebSocket>();

  useEffect(() => {
    (async () => {
      const { status, data } = await api.get('/auth/chat');
      if (status === 401) {
        return;
      }

      ws.current = new WebSocket(`wss://${process.env.API_HOST}:${process.env.API_PORT}/socket`);
    })();
  }, []);

  const sendMessage = () => {
    ws.current?.send("I'm like tt");
  }

  return (
    <div>
      <input onKeyUp={(e) => e.key === 'Enter'}></input>
      <button onClick={sendMessage} />
    </div>
  );
};
