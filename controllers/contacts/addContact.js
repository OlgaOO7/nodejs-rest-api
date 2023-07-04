const {Contact} = require('../../models/contact');

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  // const result = await contacts.addContact(req.body);
  res.status(201);
  res.json(result);
}

module.exports = addContact;
