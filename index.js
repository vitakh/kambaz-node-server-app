import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
 
import * as db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js";
 
const app = express();
const PORT = process.env.PORT || 4000;
 
const allowlist = (process.env.CLIENT_URLS ?? process.env.CLIENT_URL ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
 
const vercelPreviewRegex = /^https:\/\/kambaz-next-.*\.vercel\.app$/;
 
const corsOptions = {
  credentials: true,
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    try {
      const o = new URL(origin).origin;
      const ok = allowlist.includes(o) || vercelPreviewRegex.test(o);
      return cb(ok ? null : new Error(`CORS blocked: ${o}`), ok);
    } catch {
      return cb(new Error("Bad Origin header"), false);
    }
  },
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
 
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
 
app.set("trust proxy", 1);
 
const isProd =
  process.env.NODE_ENV === "production" ||
  (process.env.SERVER_ENV && process.env.SERVER_ENV !== "development");
 
const cookieConfig = {
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
};
 
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: isProd,
  cookie: cookieConfig,
};
 
app.use(session(sessionOptions));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
 
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
EnrollmentRoutes(app, db);
AssignmentsRoutes(app, db);
Lab5(app);
Hello(app);
 
app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
  console.log("Allowed origins:", allowlist);
});