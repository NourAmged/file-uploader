import { Request } from "express";
import { prisma } from "./prisma.js";
import bcrypt from "bcryptjs";

async function registerUser(user: Record<string, any>) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    await prisma.user.create({
      data: {
        username: user.username,
        password: hashedPassword,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") throw new Error("username already in use");
    throw error;
  }
}

async function getUserByUsername(username: string) {
  //TODO return type
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  return user;
}

async function getUserById(id: number) {
  //TODO return type
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  return user;
}

async function addFile(
  userId: number,
  file: Express.Multer.File,
  folderId: number | null = null,
): Promise<void> {
  await prisma.files.create({
    data: {
      file_name: file.originalname,
      file_path: file.path,
      type: file.mimetype,
      size: file.size,
      folderId: folderId,
      userId: userId,
    },
  });
}

async function addFolder(
  userId: number,
  folderName: string,
  parentId: number | null,
): Promise<void> {
  await prisma.folders.create({
    data: {
      folder_name: folderName,
      userId: userId,
      parentId: parentId,
    },
  });
}

async function getFilesById(userId: number, folderId: number | null) {
  const files = await prisma.files.findMany({
    where: {
      AND: [{ userId: userId }, { folderId: folderId }],
    },
  });

  return files;
}

async function getFolderById(userId: number, folderId: number | null) {
  const folders = await prisma.folders.findMany({
    where: { AND: [{ userId: userId }, { parentId: folderId }] },
  });

  return folders;
}

async function getFilePathById(fileId: number) {
  const filePath = await prisma.files.findUnique({
    where: { id: fileId },
    select: { file_path: true },
  });

  return filePath;
}

async function getUserByFileId(fileId: number) {
  const userId = await prisma.files.findUnique({
    where: { id: fileId },
    select: { userId: true },
  });

  return userId;
}

async function deleteFileById(fileId: number): Promise<void> {
  await prisma.files.delete({
    where: {
      id: fileId,
    },
  });
}

export {
  registerUser,
  getUserByUsername,
  getUserById,
  addFile,
  getFilesById,
  getUserByFileId,
  getFilePathById,
  deleteFileById,
  addFolder,
  getFolderById,
};
