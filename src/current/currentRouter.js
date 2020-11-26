const { Router } = require("express");
const controller = require("./currentController");

const router = Router();

router.get("/current", controller.currentUser);

exports.currentRouter = router;
