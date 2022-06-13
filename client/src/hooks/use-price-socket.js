import { useEffect } from 'react';
import { io } from 'socket.io-client';

import create from 'zustand';

export const usePriceSocketStore = create((set) => ({
  changes: null,
  setChanges: (data) => set(() => ({ changes: data })),
}));

const usePriceSocket = (params) => {
  const setChanges = usePriceSocketStore((state) => state.setChanges);

  useEffect(() => {
    let socket;

    if (params) {
      socket = io('/', {
        path: '/prices',
      });

      socket.on('connect', () => {
        socket.emit('getPrices', params);

        socket.on('prices', (changes) => {
          setChanges(JSON.parse(changes));
        });
      });
    }

    return () => params && socket.disconnect();
  }, [params, setChanges]);

  return null;
};

export default usePriceSocket;
