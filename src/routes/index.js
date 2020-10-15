const express = require("express");
const passport = require("passport");
const router = express.Router();
const Controller = require("../controller");

router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  Controller.postMessage
);
router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  Controller.getUserMessage
);


router.get(
  "/:random([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})",
  Controller.getMessage
);
// router.post("/login", Controller.login);
router.post("/auth", Controller.auth);

module.exports = router;
