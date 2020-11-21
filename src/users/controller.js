const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MongoClient, ObjectId } = require("mongodb");

async function addContact({ name, email, phone }) {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  try {
    return await usersCollection.insertOne({
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
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  try {
    return await usersCollection.find().toArray();
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function getContactById(contactId) {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  console.log(contactId);
  try {
    console.log(
      await usersCollection.find({ _id: ObjectId(contactId) }).toArray()
    );
    return await usersCollection.find({ _id: ObjectId(contactId) }).toArray();
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

async function updateContact(contactId, { name, email, phone }) {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  try {
    return await usersCollection.findOneAndUpdate(
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
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  try {
    return await usersCollection.deleteOne({
      _id: new ObjectId(contactId),
    });
  } catch {
    console.error("Error occured while reading directory!", err);
  }
}

currentUser = async (req, res, next) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  const token = req.headers.authorization.slice(7);
  const user = await usersCollection.findOne({ token: token });
  console.log(user);
  const userShow = {
    email: user.email,
    subscription: user.subscription,
  };
  if (!user) {
    return res.status(401).send("Not authorized");
  }

  return res.status(200).send(userShow);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  currentUser,
};
