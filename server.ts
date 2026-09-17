import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { EchoRequestSchema } from "./src/schemas/api.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Middlewares

  // Rate limiting to prevent brute-force attacks and abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
  });

  // Apply the rate limiting middleware to all requests
  app.use(limiter);

  // Helmet helps secure Express apps by setting various HTTP headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Required for Vite HMR in dev
        styleSrc: ["'self'", "'unsafe-inline'"], // Tailwind/Vite styles
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "ws:", "wss:"], // WebSockets for HMR
      },
    },
    // We must allow cross-origin isolation headers when needed,
    // but default configuration is a good starting point for general security.
    crossOriginEmbedderPolicy: false,
  }));

  // Enable CORS
  app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL || "https://theomkoffice.com" : "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }));

  // Limit body size to prevent payload too large attacks (e.g. DoS)
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Remove X-Powered-By header
  app.disable('x-powered-by');


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
    const result = EchoRequestSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid input data", details: result.error.format() });
    }
    res.json({ message: "Echo from OMK Server", data: result.data });
  });

  // Global Error Handler to avoid leaking stack traces
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[Error] ${err.message}`);
    res.status(err.status || 500).json({
      error: {
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
      }
    });
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
