const express = require("express");
const cors = require("cors");
require("dotenv").config();
const config = require("./app/config/config");

// Require routes
const authRoutes = require("./app/routes/auth.route");
const userRoutes = require("./app/routes/users.route");
const courseRoutes = require("./app/routes/courses.route");
const registerRoutes = require("./app/routes/registers.route");
const classRoutes = require("./app/routes/class.route");
const attendRoutes = require("./app/routes/attend.route");
const evalRoutes = require("./app/routes/eval.route");
const participateRoutes = require("./app/routes/participate.route");

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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/registers", registerRoutes);
app.use("/api/v1/classes", classRoutes);
app.use("/api/v1/attends", attendRoutes);
app.use("/api/v1/evals", evalRoutes);
app.use("/api/v1/participate", participateRoutes);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
