import express from "express";
// Import routing api
import apiRouting from "./routes/api.js";
// Import middleware logger
import logger from "./middleware/logger.js";

const port = process.env.APP_PORT;

// Create server
const app = express();

// Memasang middleware
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect routing
app.use(apiRouting);

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
})
