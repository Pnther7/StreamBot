import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import fs from "fs";
import config from "../config.js";
import logger from "../utils/logger.js";
import { stringify, prettySize } from "./utils/helpers.js";

import { requireAuth } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import uploadRoutes from "./routes/upload.js";
import previewRoutes from "./routes/preview.js";

if (!config.sessionSecret) {
  throw new Error("SESSION_SECRET must be set before starting the web interface.");
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/server/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 12
  }
}));
app.use(express.static(path.join(process.cwd(), 'src/server/public')));
app.use((req, res, next) => {
  res.locals.stringify = stringify;
  res.locals.prettySize = prettySize;
  next();
});
app.use(requireAuth);
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', uploadRoutes);
app.use('/', previewRoutes);

if (!fs.existsSync(config.videosDir)) fs.mkdirSync(config.videosDir, { recursive: true });
if (!fs.existsSync(path.dirname(config.previewCacheDir))) fs.mkdirSync(path.dirname(config.previewCacheDir), { recursive: true });
if (!fs.existsSync(config.previewCacheDir)) fs.mkdirSync(config.previewCacheDir, { recursive: true });

app.listen(config.server_port, () => logger.info(`Server is running on port ${config.server_port}`));
export default app;