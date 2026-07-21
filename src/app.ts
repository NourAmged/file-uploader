import("dotenv/config");
import path from "node:path";

import express from "express";
import { indexRouter } from "./routes/indexRouter";

const PORT = process.env.PORT;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", indexRouter);

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});
