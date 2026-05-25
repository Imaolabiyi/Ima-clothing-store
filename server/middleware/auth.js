const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../models/users");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        error: "You must be logged in",
      });
    }
    token = token.replace("Bearer ", "");
    const decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "You must be logged in",
    });
  }
};

exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    return res.status(403).json({ error: "You are not authenticated" });
  }
  return next();
};

exports.isAdmin = async (req, res, next) => {
  try {
    let reqUser = await userModel.findById(req.body.loggedInUserId);
    if (!reqUser) {
      return res.status(404).json({ error: "User not found" });
    }
    if (reqUser.userRole === 0) {
      return res.status(403).json({ error: "Access denied" });
    }
    return next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
