const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categories");
const multer = require("multer");
const { loginCheck } = require("../middleware/auth");
const { authRateLimiter } = require("../middleware/rateLimit");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", categoryController.getAllCategory);
router.post(
  "/add-category",
  authRateLimiter,
  loginCheck,
  upload.single("cImage"),
  categoryController.postAddCategory
);
router.post(
  "/edit-category",
  authRateLimiter,
  loginCheck,
  categoryController.postEditCategory
);
router.post(
  "/delete-category",
  authRateLimiter,
  loginCheck,
  categoryController.getDeleteCategory
);

module.exports = router;
