const express = require("express");
const cors = require("cors");
const calscanRouter = require("./app/routes/calscan.routes");
const limiter = require("./app/middlewares/rate-limiter");
const { PORT } = require("./app/configs/env");
const logger = require("./app/middlewares/logger");

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // allow *.jakariya.eu.org
      if (/^https:\/\/.*\.jakariya\.eu\.org$/.test(origin)) {
        return callback(null, true);
      }

      // allow localhost
      if (origin === "http://localhost:8080") {
        return callback(null, true);
      }

      // reject others
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use(logger);
app.get("/", (req, res) => {
  res.send("Welcome to the Proxy Server!");
});
app.use("/proxy/calscan", limiter, calscanRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
