const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers.authorization;

  // Check if the Authorization header is present
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  // Use a more robust method to extract the token (e.g., splitting by space)
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  token = tokenParts[1];

  jwt.verify(token, process.env.TOKEN_SC, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken,
};
