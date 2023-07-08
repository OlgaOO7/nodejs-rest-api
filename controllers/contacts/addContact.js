const {Contact} = require('../../models/contact');

const addContact = async (req, res) => {
  // console.log(req.user);
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  // const result = await contacts.addContact(req.body);
  res.status(201);
  res.json(result);
}

module.exports = addContact;
