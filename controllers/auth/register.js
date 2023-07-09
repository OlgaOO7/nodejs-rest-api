const bcrypt = require('bcrypt');
const {User} = require('../../models/user');
const { HttpError } = require('../../helpers');

const register = async (req, res) => {
  const {email, password} = req.body;
  console.log(password);
  const user = await User.findOne({email});

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: hashPassword});
  res.status(201);
  res.json({
    email: newUser.email,
    name: newUser.name
  })
}

module.exports = register;