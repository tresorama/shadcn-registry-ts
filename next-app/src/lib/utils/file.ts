import path from "path";
import { promises as fs } from "fs";

/** 
 * Calculate absolute file path.  
 * The input path is a relative to root path
 */
export const getFilePathFromRoot = (filePath: string) => {
  return path.join(process.cwd(), filePath);
};

/**
 * Read file data from absolute file path.  
 * The data extracted is an object with:
 * - `fileName`: (.i.e. util-hello.ts)
 * - `fileContent`: content of file as text (string)
 * - `fileAbsolutePath`: absolute file path 
 */
export const getFileAsString = async (fileAbsolutePath: string) => {
  const fileName = path.basename(fileAbsolutePath);
  const fileContent = await fs.readFile(fileAbsolutePath, "utf-8");
  return {
    fileName,
    fileContent,
    fileAbsolutePath,
  };
};

/**
 * Write a JSON file to disk, given an absolute file path and the JSON-like data
 */
export const writeFileJson = async (fileAbsolutePath: string, dataJson: unknown) => {
  // create directory if not exists
  await fs.mkdir(path.dirname(fileAbsolutePath), { recursive: true });
  await fs.writeFile(fileAbsolutePath, JSON.stringify(dataJson, null, 2));
};