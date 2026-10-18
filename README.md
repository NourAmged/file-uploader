# File Uploader

A lightweight file and folder management app built with Node.js, Express, TypeScript, PostgreSQL, Prisma, and EJS. Users can create an account, log in, create nested folders, upload files, and download or delete files and folders within a personal storage dashboard.

## Features

- User registration and login with Passport local authentication
- Session-based authorization using Express sessions and Prisma session storage
- Personal file storage per authenticated user
- Nested folder support with parent/child folder relationships
- File upload via Multer to the local uploads directory
- Download individual files
- Download a whole folder as a ZIP archive
- Delete files and folders, including cleanup of uploaded files from disk
- EJS-based UI with a simple sidebar and storage dashboard

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Passport.js
- EJS templates
- Multer
- express-zip
- bcryptjs

## Database Schema

The application uses PostgreSQL with Prisma and stores user-scoped files, folders, and session data.


### Prisma models

```prisma
model User {
  id       Int       @id @default(autoincrement())
  username String    @unique
  password String    @unique
  files    Files[]
  folders  Folders[]
}

model Files {
  id         Int      @id @default(autoincrement())
  file_name  String
  file_path  String   @unique
  size       Int
  type       String
  created_at DateTime @default(now())

  userId    Int
  user      User @relation(fields: [userId], references: [id])

  folderId  Int?
  folder    Folders? @relation(fields: [folderId], references: [id], onDelete: Cascade)
}

model Folders {
  id          Int    @id @default(autoincrement())
  folder_name String

  userId Int
  user   User @relation(fields: [userId], references: [id])

  files Files[] @relation()

  parentId Int?
  parent   Folders?  @relation("FolderHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children Folders[] @relation("FolderHierarchy")
}

model Session {
  id        String   @id
  sid       String   @unique
  data      String
  expiresAt DateTime
}
```

### Relationship summary

- A `User` can have many `Files` and many `Folders`.
- Each `File` belongs to exactly one `User` and may optionally belong to a parent `Folder`.
- Each `Folder` belongs to exactly one `User` and may have a parent `Folder` for nested hierarchy.
- `Session` stores the Express session metadata used for authentication and persistence.

## Project Structure

```text
.
├── prisma/
│   ├── schema.prisma
│   ├── generated/
│   └── migrations/
├── public/
│   ├── css/
│   └── js/
├── src/
│   ├── app.ts
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── routes/
│   └── views/
├── uploads/
├── .env
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Before you start, make sure you have:

- Node.js 18+ installed
- PostgreSQL running locally or in a remote environment
- npm or another package manager installed

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd file-uploader
```

2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables.

Create a `.env` file in the project root if it does not exist, and set your database connection string and port:

```env
PORT=3000
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"
```

The app also uses a session secret in `src/app.ts` (`secret: "lost cat in sea"`). For production, replace it with a secure environment variable.

4. Generate Prisma client and apply the schema:

```bash
npx prisma generate
npx prisma migrate deploy
```

If you are working in a fresh local setup and want Prisma to create the database schema from migrations, use:

```bash
npx prisma migrate dev
```

5. Build the project:

```bash
npm run build
```

6. Start the server:

```bash
npm run dev
```

The app should start on the port defined in `.env` (default is `3000`).

## Running the App

After starting the server, open the app in your browser:

```text
http://localhost:3000
```

You will be redirected to the login page if you are not authenticated. From there you can:

- sign up for a new account
- log in to your dashboard
- create folders
- upload files
- view your files and folders
- navigate into folders
- download or delete items

## Main Routes

- `GET /` — dashboard for the current user
- `GET /login` — login page
- `GET /sign-up` — registration page
- `GET /logout` — logout
- `POST /create-folder` — create a top-level folder
- `POST /folder/:folderId/create-folder` — create a folder inside a parent folder
- `POST /upload-file` — upload a file to the root
- `POST /folder/upload-file/:folderId` — upload a file into a folder
- `GET /file/:fileId` — download a file
- `GET /file/delete/:fileId` — delete a file
- `GET /folder/download/:folderId` — download a folder as a ZIP
- `GET /folder/delete/:folderId` — delete a folder

## Notes

- Uploaded files are stored in the local `uploads/` directory.
- Folder deletion removes the folder and any nested children according to the Prisma cascade rules.
- Files are associated with the logged-in user and can only be accessed by that user.
