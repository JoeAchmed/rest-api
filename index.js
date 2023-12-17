import express from "express";
// Import routing api
import apiRouting from "./routes/api.js";

// Create server
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect routing
app.use(apiRouting);

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
})
