import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const usePriceSocket = (params) => {
  const [changes, setChanges] = useState(null);

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
  }, [params]);

  return { changes };
};

export default usePriceSocket;
