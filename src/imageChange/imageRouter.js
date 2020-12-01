const { Router } = require("express");
const controller = require("./imageController");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const router = Router();

router.patch("/avatars", upload.single("avatar"), controller.imageChange);

exports.imageRouter = router;
