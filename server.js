import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve static React build files
app.use(express.static(path.join(__dirname, "build")));

// ✅ Handle all non-API routes (fixes path-to-regexp issue)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`✅ Frontend running on port ${PORT}`));
