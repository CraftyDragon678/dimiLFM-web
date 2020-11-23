import React, { useEffect, useRef, useState } from 'react';
import api from '../api';

export default () => {
  const ws = useRef<WebSocket>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { status, data } = await api.get('/auth/socket');
      if (status === 401) {
        return;
      }

      ws.current = new WebSocket(
        `wss://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/socket?oid=${data.oid}&token=${encodeURIComponent(data.token)}`,
      );

      ws.current.addEventListener('message', (ev) => {
        setMessages((prev) => [...prev, ev.data]);
      });
    })();

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      ws.current?.send(message);
      setMessage('');
    }
  };

  return (
    <div>
      <input onKeyUp={(e) => e.key === 'Enter' && sendMessage()} value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} />

      <div>
        <div>messages:</div>
        {messages.map((e) => (
          <div>{e}</div>
        ))}
      </div>
    </div>
  );
};
