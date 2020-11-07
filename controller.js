const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const contacts = require("./contacts");

app.use(cors());
app.use(morgan("combined"));

exports.getUsers = async (request, response) => {
  const contactsList = await contacts.listContacts();
  response.send(contactsList);
};

exports.getUserById = async (request, response) => {
  const contactsList = await contacts.getContactById(request.params.contactId);
  if (contactsList) {
    response.send(contactsList);
  } else {
    response.status(404).json({ message: "Not found" });
  }
};

exports.createUser = async (request, response) => {
  try {
    const contactsList = await contacts.addContact(request.query);
    response.status(201).send(contactsList);
  } catch (error) {
    response.status(400).json({ message: "missing required name field" });
  }
};

exports.deleteUser = async (request, response) => {
  const contactsList = await contacts.removeContact(request.params.contactId);
  if (!contactsList) {
    response.send({ message: "contact deleted" });
  } else {
    response.status(404).json({ message: "Not found" });
  }
};

exports.updateUser = async (request, response) => {
  //   if (request.query.name && request.query.email && request.query.phone) {
  //     const contactsList = await contacts.updateContact(
  //       request.params.contactId,
  //       request.query
  //     );
  //     if (contactsList) {
  //       response.send(contactsList);
  //     } else {
  //       response.status(404).json({ message: "Not found" });
  //     }
  //   } else {
  //     response.status(400).json({ message: "missing fields" });
  //   }
  try {
    const contactsList = await contacts.updateContact(
      request.params.contactId,
      request.query
    );
    if (contactsList) {
      response.send(contactsList);
    } else {
      response.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "missing fields" });
  }
};
