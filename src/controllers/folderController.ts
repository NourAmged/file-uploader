import { Request, Response, NextFunction } from "express";
import { addFolder } from "../db/queries.js";

async function createFolder(req: Request, res: Response, next: NextFunction) {
  const url = req.originalUrl;

  const user = req.user as { id: number };
  const userId = user.id;

  const folderName = req.body["folder-name"];
  const folderId = url.split("/")[2];

  if (folderId) {
    // TODO create folder inside of folders
  }

  await addFolder(userId, folderName, null);

  return res.redirect("/");
}

export { createFolder };
