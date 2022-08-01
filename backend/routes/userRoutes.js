const { protect } = require("../middleware/authMiddleware");
const express=require('express');
const {registerUser,authUser, updateUserProfile}=require('../controller/userController');
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

//router.route("/login").post(authUser);

//router.post("/login", authUser);
//router.route("/profile").post(protect, updateUserProfile);

module.exports = router;