import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

// Dynamic imports after dotenv is loaded
const { default: config } = await import("./config/config.js");
const { default: app } = await import("./server/express.js");
const { default: mongoose } = await import("mongoose");

console.log("MongoDB URI:", config.mongoUri);

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
