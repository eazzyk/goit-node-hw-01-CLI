const fs = require('node:fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db/contacts.json');
const crypto = require('node:crypto');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const getID = data.find(contact => contact.id === contactId);
  return getID || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const remove = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return remove;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: crypto.randomUUID(),
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
