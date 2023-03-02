const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      online: true,
    });

    // delete user.password;

    return res.json({
      status: true,
      user: {
        username,
        email,
        _id: user._id,
        isAvatarSet: user.isAvatarSet,
        avatarImage: user.avatarImage,
        online: user.online,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.json({ msg: "Incorrect username or password", status: false });

    if (!user.online) {
      user.online = true;
      user.save();
    }

    return res.json({
      status: true,
      user: {
        username,
        email: user.email,
        _id: user._id,
        isAvatarSet: user.isAvatarSet,
        avatarImage: user.avatarImage,
        online: user.online,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const { avatarImage } = req.body;
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.json({ status: false });

    user.avatarImage = avatarImage;
    user.isAvatarSet = true;
    user.save();

    return res.json({
      status: true,
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
        isAvatarSet: user.isAvatarSet,
        avatarImage: user.avatarImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "online",
    ]);

    if (!users) return res.json({ status: false });

    return res.json({ status: true, users });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.json({ status: false });

    return res.json({ online: user.online });
  } catch (error) {
    next(error);
  }
};
