import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import create from 'zustand';

export const usePriceSocketStore = create((set) => ({
  changes: null,
  setChanges: (data) => set(() => ({ changes: data })),
}));

const usePriceSocket = (params) => {
  const setChanges = usePriceSocketStore((state) => state.setChanges);
  const [connected, setConnected] = useState();
  const socketRef = useRef();

  useEffect(() => {
    if (params) {
      socketRef.current = io('/', {
        path: '/prices',
      });

      const socket = socketRef.current;

      socket.on('connect', () => {
        setConnected(true);

        socket.emit('getPrices', params);

        socket.on('prices', (changes) => {
          setChanges(JSON.parse(changes));
        });
      });
    }
  }, [params, setChanges]);

  useEffect(() => {
    return () => connected && socketRef.current.disconnect();
  }, [connected]);

  return null;
};

export default usePriceSocket;
