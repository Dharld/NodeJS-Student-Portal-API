const express = require("express");
const cors = require("cors");
require("dotenv").config();
const config = require("./app/config/config");

// Require routes
const authRoutes = require("./app/routes/auth.route");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

app.use(express.json());

const db = require("./app/models");

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Data had been synchronized correctly.");
}); */

// Routes
app.use("/api/v1/auth", authRoutes);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
