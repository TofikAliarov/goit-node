const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { MongoClient } = require("mongodb");

imageChange = async (req, res, next) => {
  const client = await MongoClient.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
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
      $set: {
        avatarURL: `http://localhost:3000/images/${req.file.originalname}`,
      },
    }
  );
  console.log(req.file.originalname);
  return res
    .status(204)
    .send(`http://localhost:3000/images/${req.file.originalname}`);
};

module.exports = {
  imageChange,
};
