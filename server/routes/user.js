const router = require("express").Router();
const User = require("../models/User");

const { verifyToken } = require("./middleWare");

// });
router.get("/match/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;
  try {
    res.status(201).json(id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/message/:matchid", verifyToken, async (req, res) => {
  const { matchid } = req.params;
  const id = req.userId;
  const message = req.body.message;
  
  try {
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
