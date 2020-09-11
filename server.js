const express = require("express");
const dotenv = require("dotenv");
const apiRouter = require("./routers/api");
const appRouter = require("./routers/app");
const app = express();

// Load env vars
dotenv.config();
const port = process.env.PORT;

// Load static files
app.use("/static", express.static("public"));

// API Router
app.use("/api", apiRouter);

// APP Router
app.use("/", appRouter);

// Run app
app.listen(port, () => {
  console.log(`App running in port: ${port}`);
});
