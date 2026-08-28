import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json());

  // === API ROUTES ===
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "OMK Web OS Core" });
  });

  // Example API route for future extensions (database, Gemini, etc.)
  app.post("/api/echo", (req, res) => {
    res.json({ message: "Echo from OMK Server", data: req.body });
  });

  // === VITE MIDDLEWARE / SPA FALLBACK ===
  if (process.env.NODE_ENV !== "production") {
    // Development mode: Use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OMK OS] Backend Core Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
