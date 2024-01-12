const router = require("express").Router();
const User = require("../models/User");
const Match = require("../models/Match");
const { verifyToken } = require("./middleWare");
const GlobalChat = require("../models/GlobalChat");
const multer = require("multer");

// });
const upload = multer();

router.get("/", verifyToken, async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(201).json(user);
      return;
    } else {
      res.status.json(400).json({ error: "Match not exist" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/update",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    // console.log(req);
    const userId = req.userId;
    const avatarImg = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { avatarImg: avatarImg } },
        {
          new: false,
        }
      );
      if (updatedUser) {
        console.log("ok");
        res.status(200).json(updatedUser);
      } else {
        console.log("not ok");
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/match/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;
  try {
    const match = await Match.findById(matchid);
    if (match) {
      // if (match.participants.includes(id))
      res.status(201).json(match);
      // else res.status(400).json({ error: "Match not exist" });
      return;
    } else {
      res.status.json(400).json({ error: "Match not exist" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/matches", verifyToken, async (req, res) => {
  const id = req.userId;
  console.log(id);
  try {
    const matches = await Match.find({ participants: id });
    console.log(matches);
    if (matches.length > 0) {
      res.status(200).json(matches);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/getother/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      console.log("no user");
      res.status(401).json({ error: "No user" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/matches/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;

  try {
    const match = await Match.findOneAndDelete({
      _id: matchid,
      participants: { $elemMatch: { $eq: id } },
    });

    if (!match) {
      res
        .status(404)
        .json({ error: "Match not found or user is not a participant" });
      return;
    }

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/getusers", async (req,res) => {
//   const users = await User.find();
//   if(users){
//     // let userData = JSON.stringify(users);
//     console.log({users: users})
//     res.status(200).json({users: users});
//   }else{
//     res.status(500).json({ error: "Not Found" });
//   }
// })
router.post("/sendMessage/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;
  const { message } = req.body;

  try {
    const match = await Match.findById(matchid);

    if (match) {
      if (match.participants.includes(id)) {
        match.conversation.push({
          sender: id,
          message,
        });
        await match.save();

        res
          .status(201)
          .json({ success: true, message: "Message sent successfully" });
      } else {
        res
          .status(403)
          .json({ error: "User is not a participant in the match" });
      }
    } else {
      res.status(400).json({ error: "Match does not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sendMessage/", verifyToken, async (req, res) => {
  const id = req.userId;
  const { message } = req.body;

  try {
    const chat = await GlobalChat.findOne();

    if (chat) {
      chat.conversation.push({
        sender: id,
        message,
      });
      await chat.save();
      res.status(201).json({ msg: "ok" });
    } else {
      res.status(400).json({ error: "Chat does not exist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
