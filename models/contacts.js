const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    // console.log(data);
    return JSON.parse(data);
  } catch (err) {
    err.message = "Cannot read books";
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contactIdToString = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactIdToString);
    // console.log(result);
    return result || null;
  } catch (err) {
    err.message = "Cannot find contact bu id";
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const contactIdToString = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactIdToString);
    if (index === -1) {
      return null;
    };
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    err.message = "Cannot remove contact by id";
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    err.message = "Cannot add contact by id";
    throw err;
  }
}

const updateContact = async(id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1){
      return null;
  }
  contacts[index] = {id, ...data};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
