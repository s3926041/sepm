const router = require("express").Router();
const User = require("../models/User");
const Match = require("../models/Match");
const { verifyToken } = require("./middleWare");

// });
router.get("/match/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;
  try {
    const match = await Match.findById(matchid);
    if (match) {
      res.status(201).json(id);
      return;
    } else {
      res.status.json(400).json({ error: "Match not exist" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

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

        // Save the updated match document
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

module.exports = router;
