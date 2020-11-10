const path = require("path");

const { MongoClient, ObjectId } = require("mongodb");

// const client = await MongoClient.connect(
//   "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
// );
// const db = client.db("db-contacts");
// const postsCollection = db.collection("contacts");

async function addContact({ name, email, phone }) {
  const client = await MongoClient.connect(
    "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
  );
  const db = client.db("db-contacts");
  const postsCollection = db.collection("contacts");
  try {
    return await postsCollection.insertOne({
      name,
      email,
      phone,
      subscription: "premium",
      password: "password",
      token: " ",
    });
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function listContacts() {
  const client = await MongoClient.connect(
    "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
  );
  const db = client.db("db-contacts");
  const postsCollection = db.collection("contacts");
  try {
    return await postsCollection.find().toArray();
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function getContactById(contactId) {
  const client = await MongoClient.connect(
    "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
  );
  const db = client.db("db-contacts");
  const postsCollection = db.collection("contacts");
  try {
    return await postsCollection.find({ _id: ObjectId(contactId) }).toArray();
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function updateContact(contactId, { name, email, phone }) {
  const client = await MongoClient.connect(
    "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
  );
  const db = client.db("db-contacts");
  const postsCollection = db.collection("contacts");
  try {
    return await postsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(contactId),
      },
      {
        $set: { name, email, phone },
      }
    );
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function removeContact(contactId) {
  const client = await MongoClient.connect(
    "mongodb+srv://qwerty:qwerty123@cluster0.9lx9t.mongodb.net/goitHw?retryWrites=true&w=majority"
  );
  const db = client.db("db-contacts");
  const postsCollection = db.collection("contacts");
  try {
    return await postsCollection.deleteOne({
      _id: new ObjectId(contactId),
    });
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
