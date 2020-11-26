const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MongoClient } = require("mongodb");

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
  currentUser,
};
