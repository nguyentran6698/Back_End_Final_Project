const {
  getAllCards,
  createCard,
  getSingleCard,
  updateCard,
  removeCard,
} = require("../controllers/cardController");
const { authenticateUser } = require("../middleware/authentication");
const express = require("express");
const router = express.Router();

router.route("/").post(authenticateUser, createCard);
router.route("/getAllCards").post(authenticateUser, getAllCards);

router
  .route("/:id")
  .get(authenticateUser, getSingleCard)
  .patch(authenticateUser, updateCard)
  .delete(authenticateUser, removeCard);

module.exports = router;
