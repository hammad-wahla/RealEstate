const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.get("/", adminController.getAllAdmins);
router.post("/register", adminController.registerAdmin);
router.get("/dashboard", auth, adminController.adminDashboard);
router.post("/logout", adminController.logout);

module.exports = router;
