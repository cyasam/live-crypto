import axios from 'axios';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../utils';

const router = express.Router();

const uploadPicture = async (user) => {
  try {
    const { picture } = user;

    let fileExtension = '.svg';
    let mimetype = 'image/svg+xml';

    const response = await axios.get(picture, { responseType: 'arraybuffer' });
    let avatarImage = response.data;

    mimetype = response.headers['content-type'];

    if (mimetype === 'image/jpeg') {
      fileExtension = '.jpg';
    } else if (mimetype === 'image/png') {
      fileExtension = '.png';
    }

    const avatarFileName = `${uuidv4()}${fileExtension}`;
    const avatarFileUrl = `public/${avatarFileName}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(avatarFileUrl, avatarImage, {
        cacheControl: '3600',
        upsert: false,
        contentType: mimetype,
      });

    if (error) {
      console.log('upload picture', error);
      return null;
    }

    const { publicURL, error: error2 } = supabase.storage
      .from('avatars')
      .getPublicUrl(avatarFileUrl);

    if (error2) {
      console.log('get picture url', error2);
      return null;
    }

    return publicURL;
  } catch (error) {
    console.log(error);
    return null;
  }
};

router.get('/login', async (req, res) => {
  const access_token = req.headers['x-supabase-auth'];

  const { user, error } = await supabase.auth.api.getUser(access_token);

  if (!user || error)
    return res.status(404).json({ message: 'user not found' });

  const {
    data: [profile],
  } = await supabase
    .from('profiles')
    .select('id,name,email,picture')
    .eq('id', user.id);

  if (
    profile &&
    profile.picture.includes(process.env.REACT_APP_SUPABASE_URL) === false
  ) {
    const avatarUrl = await uploadPicture(user.user_metadata);

    if (!avatarUrl)
      return res.status(400).json({ message: 'picture not found' });

    const {
      data: [profile],
    } = await supabase
      .from('profiles')
      .update({
        picture: avatarUrl,
      })
      .eq('id', user.id);

    return res.status(200).json(profile);
  }

  res.status(200).json(profile);
});

export default router;
