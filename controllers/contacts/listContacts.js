const {Contact} = require('../../models/contact');

const listContacts = async (req, res) => {
  //  const result = await contacts.listContacts();
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  if (req.query.favorite === "true") {
    const favoriteContacts = await Contact.find(
      { owner, favorite: true },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email subscription");
    return res.json(favoriteContacts);
  }
  const result = await Contact.find({owner}, '-createdAt -updatedAt', {}).populate('owner', 'name email');
  res.status(200);
  res.json(result);
};

module.exports = listContacts;