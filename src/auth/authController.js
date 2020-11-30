const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Avatar = require("avatar-builder");
const fs = require("fs");

require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MongoClient, ObjectId } = require("mongodb");

register = async (req, res, next) => {
  const timeInMs = Date.now();
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  const { email, password } = req.query;
  const existingUser = await usersCollection.findOne({ email });
  const passwordHash = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  if (existingUser) {
    res.status(409).send("Email in use");
  }

  const catAvatar = Avatar.catBuilder();

  catAvatar
    .create()
    .then((buffer) =>
      fs.writeFileSync(`public/images/${timeInMs}.png`, buffer)
    );

  const newUser = await usersCollection.insertOne({
    email,
    subscription: "free",
    password: passwordHash,
    avatarURL: `http://localhost:3000/images/${timeInMs}.png`,
    token: " ",
  });
  res.status(201).send(newUser);
};

login = async (req, res, next) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  const { email, password } = req.query;

  const user = await usersCollection.findOne({ email });
  if (!user) {
    res.status(404).send("User with such email not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid || !email) {
    res.status(403).send("Email or password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  await usersCollection.findOneAndUpdate({ email }, { $set: { token: token } });
  return res.status(200).send({
    user: user,
    token,
  });
};

logout = async (req, res, next) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  const newToken = " ";

  if (!req.headers.authorization) {
    return res.status(401).send("Not authorized");
  }
  const token = req.headers.authorization.replace("Bearer ", "");

  await usersCollection.updateOne(
    { token: token },
    {
      $set: { token: newToken },
    }
  );

  return res.status(204).send();
};

module.exports = {
  register,
  login,
  logout,
};
