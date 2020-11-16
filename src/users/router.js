const { Router } = require("express");
const { validate } = require("../helpers/validate");
const controller = require("./controller");
const { contactSchema } = require("./schemes");

const router = Router();
// CRUD

// 1. C - Create
router.post("/", validate(contactSchema), controller.addContact);

// 2. R - Read
router.get("/", controller.listContacts);
router.get("/:contactId", controller.getContactById);

// 3. U - Update
router.patch("/:contactId", validate(contactSchema), controller.updateContact);

// 4. D - Delete
router.delete("/:contactId", controller.removeContact);

exports.usersRouter = router;
