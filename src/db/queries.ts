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

export { registerUser, getUserByUsername, getUserById };
