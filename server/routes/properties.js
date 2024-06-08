const express = require("express");
const router = express.Router();
const propertiesController = require("../controllers/propertiesController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images"), propertiesController.createProperty);
router.get("/", propertiesController.getAllProperties);
router.get("/:id", propertiesController.getSingleProperty);
router.put("/:id", upload.array("images"), propertiesController.updateProperty);
router.delete("/:id", propertiesController.deleteProperty);

module.exports = router;
