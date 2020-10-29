const http = require("http");

const contacts = require("./contacts");

// contacts.listContacts();
// contacts.getContactById(3);
// contacts.removeContact(3);
// contacts.addContact("Mango", "mango@gmail.com", "322-22-22");

const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();

      break;

    case "get":
      // ... id
      contacts.getContactById(id);
      break;

    case "add":
      // ... name email phone
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      // ... id
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
