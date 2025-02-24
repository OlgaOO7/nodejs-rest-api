const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const {User} = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = async (req, res) => {
  const {email, password} = req.body;
  console.log(password);
  const user = await User.findOne({email});

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

const hashPassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
  res.status(201);
  res.json({
    email: newUser.email,
    name: newUser.name
  })
}

module.exports = register;