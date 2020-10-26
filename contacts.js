const contactsPath = require("./db/contacts.json");
const fs = require("fs");

function listContacts() {
  fs.readFile("./db/contacts.json", "utf8", (err, data) => {
    console.log(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile("./db/contacts.json", "utf8", (err, data) => {
    const contacts = JSON.parse(data);
    const contact = contacts.find((el) => el.id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile("./db/contacts.json", "utf8", (err, data) => {
    const contacts = JSON.parse(data);
    const newArr = contacts.filter((el) => el.id != contactId);
    fs.writeFileSync(
      "./db/contacts.json",
      JSON.stringify(newArr, null, 4),
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile("./db/contacts.json", "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    const contacts = JSON.parse(data);
    console.log(contacts);
    const contact = {
      id: contacts.length + 1,
      name,
      email,
      phone,
    };
    const newList = [...contacts, contact];
    fs.writeFileSync(
      "./db/contacts.json",
      JSON.stringify(newList, null, 4),
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      }
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
