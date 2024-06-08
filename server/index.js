const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const propertiesRouter = require("./routes/properties");
const adminRoutes = require("./routes/admin");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const uploadsDir = path.join(__dirname, "uploads");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at ${uploadsDir}`);
  } else {
    console.log(`Uploads directory already exists at ${uploadsDir}`);
  }
} catch (error) {
  console.error(`Error creating uploads directory: ${error.message}`);
  process.exit(1);
}

app.use("/uploads", express.static(uploadsDir));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertiesRouter);
app.get("/", (req, res) => {
  res.send("Real Estate API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
