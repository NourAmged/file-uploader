import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "url";

import express from "express";
import { indexRouter } from "./routes/indexRouter.js";
import { loginRouter, registerRouter } from "./routes/authRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

const app = express();



app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use("/login", loginRouter);
app.use("/sign-up", registerRouter);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
