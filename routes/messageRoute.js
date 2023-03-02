const router = require("express").Router();
const {
  recieveMessage,
  getMessages,
} = require("../controller/messageController");

router.post("/recieve", recieveMessage);
router.post("/getmsg", getMessages);

module.exports = router;
