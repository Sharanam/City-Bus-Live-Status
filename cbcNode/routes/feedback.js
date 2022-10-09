const express = require("express");
const router = express.Router();

const {
  newFeedback,
  getFeedback,
  viewFeedbacks,
  giveReply,
  updateFeedback,
} = require("../controllers/feedback");
const {
  isAuthorizedAdmin,
  isAuthorizedCommuter,
} = require("../utils/roleValidation");
const { getUser } = require("../utils/getUser");

router.post("/", getUser, newFeedback);
router.put("/", isAuthorizedCommuter, getUser, updateFeedback);
router.get("/:feedbackId", getFeedback);
router.get("/page/:pageNumber", viewFeedbacks);
router.get("/reply/:feedbackId", isAuthorizedAdmin, giveReply);
module.exports = router;