const {Contact} = require('../../models/contact');

const listContacts = async (req, res) => {
  //  const result = await contacts.listContacts();
  const {_id: owner} = req.user;
  const result = await Contact.find({owner}, '-createdAt -updatedAt').populate('owner', 'name email');
  res.json(result);
  console.log(owner);
};

module.exports = listContacts;