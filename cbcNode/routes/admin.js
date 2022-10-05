const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  blacklistUser,
  setAdmin,
} = require("../controllers/admin");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.get("/getUsers", isAuthorizedAdmin, getUsers);
router.get("/getUser/:id", isAuthorizedAdmin, getUser);
router.post("/blacklist/:id", isAuthorizedAdmin, blacklistUser);
router.post("/setAdmin/:id", isAuthorizedAdmin, setAdmin);

module.exports = router;
