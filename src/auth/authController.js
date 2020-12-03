const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Avatar = require("avatar-builder");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");

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
  const verificationToken = uuidv4();

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
    verificationToken,
    avatarURL: `http://localhost:3000/images/${timeInMs}.png`,
    token: " ",
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${email}`,
    from: "smilokiller98@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: `http://localhost:3000/auth/verify/${verificationToken}`,
    html: `<p>http://localhost:3000/auth/verify/${verificationToken}</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
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

verify = async (req, res, next) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  const db = client.db(process.env.MONGODB_NAME);
  const usersCollection = db.collection("contacts");
  const newToken = "";
  console.log(req.params.verificationToken);

  const user = await usersCollection.findOne({
    verificationToken: req.params.verificationToken,
  });
  console.log(user);
  if (!user) {
    return res.status(404).send("User not found");
  }

  await usersCollection.updateOne(
    { verificationToken: req.params.verificationToken },
    {
      $set: { verificationToken: newToken },
    }
  );

  return res.status(200).send();
};

module.exports = {
  register,
  login,
  logout,
  verify,
};
