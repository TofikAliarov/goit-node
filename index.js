const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const contacts = require("./contacts");
const port = 3000;
const { usersRouter } = require("./router");
const mongoDb = require("./mongoDb");
app.use(cors());
app.use(morgan("combined"));

// app.get("/api/contacts", cors(), async (request, response) => {
//   const contactsList = await contacts.listContacts();
//   response.send(contactsList);
// });

// app.get("/api/contacts/:contactId", cors(), async (request, response) => {
//   const contactsList = await contacts.getContactById(request.params.contactId);
//   if (contactsList) {
//     response.send(contactsList);
//   } else {
//     response.status(404).json({ message: "Not found" });
//   }
// });

// app.post("/api/contacts", cors(), async (request, response) => {
//   if (request.query.name && request.query.email && request.query.phone) {
//     const contactsList = await contacts.addContact(request.query);
//     response.status(201).send(contactsList);
//   } else {
//     response.status(400).json({ message: "missing required name field" });
//   }
// });

// app.delete("/api/contacts/:contactId", cors(), async (request, response) => {
//   const contactsList = await contacts.removeContact(request.params.contactId);
//   if (!contactsList) {
//     response.send({ message: "contact deleted" });
//   } else {
//     response.status(404).json({ message: "Not found" });
//   }
// });

// app.patch("/api/contacts/:contactId", cors(), async (request, response) => {
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
// });

app.get("/api/contacts", cors(), async (request, response) => {
  const contactsList = await mongoDb.listContacts();
  response.send(contactsList);
});

app.get("/api/contacts/:contactId", cors(), async (request, response) => {
  const contactsList = await mongoDb.getContactById(request.params.contactId);
  if (contactsList) {
    response.send(contactsList);
  } else {
    response.status(404).json({ message: "Not found" });
  }
});

app.post("/api/contacts", cors(), async (request, response) => {
  if (request.query.name && request.query.email && request.query.phone) {
    const contactsList = await mongoDb.addContact(request.query);
    response.status(201).send(contactsList);
  } else {
    response.status(400).json({ message: "missing required name field" });
  }
});

app.delete("/api/contacts/:contactId", cors(), async (request, response) => {
  const contactsList = await mongoDb.removeContact(request.params.contactId);
  if (!contactsList) {
    response.send({ message: "contact deleted" });
  } else {
    response.status(404).json({ message: "Not found" });
  }
});

app.patch("/api/contacts/:contactId", cors(), async (request, response) => {
  if (request.query.name && request.query.email && request.query.phone) {
    const contactsList = await mongoDb.updateContact(
      request.params.contactId,
      request.query
    );
    if (contactsList) {
      response.send(contactsList);
    } else {
      response.status(404).json({ message: "Not found" });
    }
  } else {
    response.status(400).json({ message: "missing fields" });
  }
});

app.use("/api/contacts", usersRouter);
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
