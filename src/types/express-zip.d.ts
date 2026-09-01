import * as express from "express";

interface ZipFile {
  path: string;
  name: string;
}

declare global {
  namespace Express {
    interface Response {
      zip(
        files: Array<ZipFile>,
        filename?: string,
        callback?: (err: any, totalBytes: number) => void,
      ): void;
    }
  }
}
