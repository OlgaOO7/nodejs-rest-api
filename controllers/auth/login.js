const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User} = require('../../models/user');
const { HttpError } = require('../../helpers');

const {SECRET_KEY} = process.env;

const login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email);
  console.log(password);
  const user = await User.findOne({email});
  console.log(user);
  if(!user) {
    throw HttpError(401, "Email or password invalid")
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare) {
    throw HttpError(401, "Email or password invalid")
  }
  console.log(passwordCompare);
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12d'});
  await User.findByIdAndUpdate(user._id, {token});
  res.json({
    token,
  })
}

module.exports = login;