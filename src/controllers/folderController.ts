import { Request, Response, NextFunction } from "express";

import "express-zip";

import {
  addFolder,
  getFilesByFolderId,
  removeFolder,
  parentFolder,
} from "../db/queries.js";
import { unlink } from "node:fs/promises";

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

  const filePaths = await getFilesByFolderId(folderId);
  const parentFolderId = await parentFolder(folderId);

  await removeFolder(folderId);

  if (filePaths) {
    await Promise.all(
      filePaths.map((file) => {
        unlink(file.file_path);
      }),
    );
  }
  if (parentFolderId?.parentId)
    return res.redirect(`/folder/${parentFolderId.parentId}`);
  return res.redirect("/");
}

async function downloadFolder(req: Request, res: Response, next: NextFunction) {
  const folderId = Number(req.params.folderId);
  const filePaths = await getFilesByFolderId(folderId);

  if (filePaths.length <= 0) {
    return res.redirect(`/folder/${folderId}`);
  }

  const filesToDownload = filePaths.map((file) => {
    return { path: file.file_path, name: file.file_name };
  });

  res.zip(filesToDownload, "archive.zip", (err) => {
    if (err) {
      console.error("Error during zipping process:", err);
      if (!res.headersSent) {
        res.status(500).send("Could not generate ZIP file.");
      }
    }
  });


}

export { createFolder, deleteFolder, downloadFolder };
