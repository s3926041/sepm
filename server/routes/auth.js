const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./middleWare");

router.post("/register/User", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ phone: req.body.phone }, { email: req.body.email }],
    });
    if (user) {
      res.status(400).json({ error: "Email or Phone exist" });
      return;
    } else {
      const newUser = new User({
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: await bcrypt.hash(req.body.password, 10),
      });

      await newUser.save();
      console.log(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login/User", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      $or: [{ phone: req.body.username }, { email: req.body.username }],
    });
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
