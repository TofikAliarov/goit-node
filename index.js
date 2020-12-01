const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;
const { usersRouter } = require("./src/users/router");
const { authRouter } = require("./src/auth/authRouter");
const { currentRouter } = require("./src/current/currentRouter");
const { imageRouter } = require("./src/imageChange/imageRouter");

app.use(express.static("public"));
app.use(cors());
app.use(morgan("combined"));

app.use("/api/contacts", usersRouter);
app.use("/auth", authRouter);
app.use("/users", currentRouter);
app.use("/users", imageRouter);

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
