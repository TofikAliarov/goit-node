const e = require("express");
const contactsPath = require("./db/contacts.json");
const fs = require("fs").promises;

async function listContacts() {
  try {
    return await fs.readFile("./db/contacts.json");
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await fs.readFile("./db/contacts.json");
    const contacts = JSON.parse(contactsList);
    const contact = contacts.find((el) => el.id === Number(contactId));
    return contact;
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await fs.readFile("./db/contacts.json");
    const contacts = JSON.parse(contactsList);
    const newArr = contacts.filter((el) => el.id != contactId);
    fs.writeFile("./db/contacts.json", JSON.stringify(newArr, null, 4));
    return newArr.length === contacts.length;
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contactsList = await fs.readFile("./db/contacts.json");
    const contacts = JSON.parse(contactsList);
    const contact = {
      id: contacts.length + 2,
      name,
      email,
      phone,
    };
    const newList = [...contacts, contact];
    fs.writeFile("./db/contacts.json", JSON.stringify(newList, null, 4));
    const contactsListReloaded = await fs.readFile("./db/contacts.json");

    return contactsListReloaded;
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function updateContact(contactId, { name, email, phone }) {
  try {
    const contactsList = await fs.readFile("./db/contacts.json");
    const contacts = JSON.parse(contactsList);
    const contact = contacts.find((el) => el.id === Number(contactId));
    const newContact = {
      id: contact.id,
      name,
      email,
      phone,
    };
    const newArr = contacts.map((el) =>
      el.id === Number(contactId) ? newContact : el
    );
    fs.writeFile("./db/contacts.json", JSON.stringify(newArr, null, 4));
    return newContact;
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
