const { Router } = require("express");
const { validate } = require("../helpers/validate");
const controller = require("./controller");
const { contactSchema } = require("./schemes");

const router = Router();
// CRUD

// 1. C - Create
router.post("/", validate(contactSchema), async function (req, res) {
  const contactsList = await controller.addContact(req.query);
  res.send(contactsList);
});

// 2. R - Read
router.get("/", async function (req, res) {
  const contactsList = await controller.listContacts();
  res.send(contactsList);
});

router.get("/current", controller.currentUser);

router.get("/:contactId", async function (req, res) {
  const contactsList = await controller.getContactById(req.params.contactId);
  res.send(contactsList);
});

// 3. U - Update
router.patch("/:contactId", validate(contactSchema), async function (req, res) {
  const contactsList = await controller.updateContact(
    req.params.contactId,
    req.query
  );
  res.send(contactsList);
});

// 4. D - Delete
router.delete("/:contactId", async function (req, res) {
  const contactsList = await controller.removeContact(req.params.contactId);
  if (!contactsList) {
    res.send({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

exports.usersRouter = router;
