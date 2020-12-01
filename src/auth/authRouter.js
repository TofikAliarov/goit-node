const { Router } = require("express");
const { validate } = require("../helpers/validate");
const controller = require("./authController");
const { contactSchema } = require("./authSchemes");

const router = Router();

router.post("/register", validate(contactSchema), controller.register);

router.post("/login", validate(contactSchema), controller.login);

router.post("/logout", controller.logout);

router.get("/verify/:verificationToken", controller.verify);

exports.authRouter = router;
