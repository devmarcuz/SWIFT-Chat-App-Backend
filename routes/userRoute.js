const router = require("express").Router();
const {
  registerUser,
  loginUser,
  setAvatar,
  getUsers,
  getUser,
} = require("../controller/userController");

router.post("/add-user", registerUser);
router.post("/login-user", loginUser);
router.post("/setavatar/:id", setAvatar);
router.get("/all-users/:id", getUsers);
router.get("/get-user/:id", getUser);

module.exports = router;
