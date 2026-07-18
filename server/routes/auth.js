const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { loginCheck, isAuth, isAdmin } = require("../middleware/auth");
const { authRateLimiter } = require("../middleware/rateLimit");

router.post("/isadmin", authRateLimiter, authController.isAdmin);
router.post("/signup", authController.postSignup);
router.post("/signin", authController.postSignin);
router.post(
  "/user",
  authRateLimiter,
  loginCheck,
  isAuth,
  isAdmin,
  authController.allUser
);

module.exports = router;
