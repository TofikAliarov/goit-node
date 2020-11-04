const { Router } = require("express");
const { validate } = require("./validate");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./controller");
const { userSchema } = require("./schemes");

const router = Router();
// CRUD

// 1. C - Create
router.post("/", validate(userSchema), createUser);

// 2. R - Read
router.get("/", getUsers);
router.get("/:contactId", getUserById);

// 3. U - Update
router.patch("/:contactId", validate(userSchema), updateUser);

// 4. D - Delete
router.delete("/:contactId", deleteUser);

exports.usersRouter = router;
