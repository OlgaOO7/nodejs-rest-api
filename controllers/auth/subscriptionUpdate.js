const {User} = require('../../models/user');

const subscriptionUpdate = async (req, res) => {
  const {_id} = req.user;
  const {sunscription} = req.body;
  await User.findByIdAndUpdate(_id, {sunscription});
  res.json({
    message: "Subscription is successfull"
  })
}

module.exports = subscriptionUpdate;