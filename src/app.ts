import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "url";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import express from "express";
import { indexRouter } from "./routes/indexRouter.js";
import {
  loginRouter,
  registerRouter,
  logoutRouter,
} from "./routes/authRouter.js";

import { folderRouter } from "./routes/folderRouter.js";

import { fileRouter } from "./routes/fileRouter.js";

import { prisma } from "./db/prisma.js";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

const app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: false }));

app.use(
  expressSession({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: "lost cat in sea",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use(passport.session());

app.use("/login", loginRouter);
app.use("/sign-up", registerRouter);

app.use("/", indexRouter);
app.use("/folder/", indexRouter);

app.use("/create-folder", folderRouter);
app.use("/folder/upload-file/", fileRouter);
app.use("/folder/delete/", folderRouter);

app.use("/upload-file", fileRouter);
//download file
app.use("/file/", fileRouter);
//delete file
app.use("/file/", fileRouter);

app.use("/logout", logoutRouter);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
