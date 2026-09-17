import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON parsing
  app.use(express.json());


  // === OBSERVABILITY MIDDLEWARE ===
  // 1. Correlation ID
  app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
    (req as any).correlationId = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
  });

  // 2. Structured Logging
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      // Filter out noisy health checks from general logs
      if (!req.path.startsWith('/api/health')) {
        console.log(JSON.stringify({
          level: res.statusCode >= 400 ? 'error' : 'info',
          method: req.method,
          path: req.path,
          status: res.statusCode,
          durationMs: duration,
          correlationId: (req as any).correlationId
        }));
      }
    });
    next();
  });

  // === API ROUTES ===
  // Readiness and liveness probes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "OMK Web OS Core" });
  });
  app.get("/api/health/live", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/api/health/ready", (req, res) => {
    res.json({ status: "ok" });
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
