const router = require("express").Router();
const User = require("../models/User");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const upload = multer();
router.post("/register/", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const user = await User.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });

    if (user) {
      res.status(400).json({ error: "Email or Phone exist" });
      return;
    }

    // Create a new user with image upload
    const newUser = new User({
      phone: req.body.phone,
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      avatarImg: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login/", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      $or: [{ phone: req.body.username }, { email: req.body.username }],
    });
    // const user = await User.findOne({ email: req.body.username });
    console.log(user);
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      { id: user._id, role: "User" },
      process.env.TOKEN_SC,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
