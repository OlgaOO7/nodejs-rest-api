const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const {User} = require('../../models/user');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async(req, res) => {
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(_id, {avatarURL});

  res.status(200);
  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar;