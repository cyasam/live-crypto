import express from 'express';
import { existCache, getCache, setCache } from '../redis';
import { supabase } from '../utils';

const router = express.Router();

const setChatRoomMessages = async (roomKey, result) => {
  await setCache(roomKey, result, { EX: 3600 });
};

const fetchChatMesages = async (room) => {
  const roomKey = `room:${room}`;

  const isExistCache = await existCache(roomKey);
  if (isExistCache) {
    return await getCache(roomKey);
  }

  const { data: chatMessages, error } = await supabase
    .from('chat')
    .select(
      `id,
      message,
      created_at,
      profiles (
        id,
        name,
        picture
      )`
    )
    .eq('room', room)
    .order('created_at', { ascending: false });

  if (error) console.log(error);

  const result = {
    data: chatMessages?.map((chatMessage) => {
      return {
        id: chatMessage.id,
        message: chatMessage.message,
        created_at: chatMessage.created_at,
        user: chatMessage.profiles,
      };
    }),
  };

  await setChatRoomMessages(roomKey, result);

  return result;
};

router.get('/:room/messages/', async (req, res) => {
  try {
    const messages = await fetchChatMesages(req.params.room);

    res.status(200).json(messages);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
