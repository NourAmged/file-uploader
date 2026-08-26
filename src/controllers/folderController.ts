import { Request, Response, NextFunction } from "express";
import { addFolder, getFilesByFolderId } from "../db/queries.js";

async function createFolder(req: Request, res: Response, next: NextFunction) {
  const user = req.user as { id: number };
  const userId = user.id;

  const folderName = req.body["folder-name"];
  const folderId = Number(req.params.folderId);

  await addFolder(userId, folderName, folderId);

  if (folderId) return res.redirect(`/folder/${folderId}`);
  return res.redirect("/");
}

async function deleteFolder(req: Request, res: Response, next: NextFunction) {
  const folderId = Number(req.params.folderId);

  const filesPath = await getFilesByFolderId(folderId);

  console.log(filesPath);

  return res.redirect("/");
}

export { createFolder, deleteFolder };
