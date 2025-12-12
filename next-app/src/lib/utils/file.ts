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
 * Write a JSON file to disk, given an absolute file path and the JSON-like data
 */
export const writeFileJson = async (fileAbsolutePath: string, dataJson: unknown) => {
  // create directory if not exists
  await fs.mkdir(path.dirname(fileAbsolutePath), { recursive: true });
  await fs.writeFile(fileAbsolutePath, JSON.stringify(dataJson, null, 2));
};



type FileData = {
  /** File Name: `string` @example  "util-hello.ts" */
  fileName: string;
  /** File content: `string` @example "export const hello = () => console.log('hello')" */
  fileContent: string;
  /** File absolute path: `string` @example "/root/path/to/file.extension" */
  fileAbsolutePath: string;
  /** File Last modified date: `number` @example  1672531200000 */
  lastModifiedDate: number;
};
const getFileDataCache = {
  items: {} as Record<string, { fileData: FileData; lastModifiedDate: number; }>
};
/**
 * Read file data from absolute file path.  
 * If called multiple times with the same path, the file will be read only once (comparing last modified date).  
 * The cache is a global singleton.  
 * 
 * The data extracted is {@link FileData} object with:
 */
export const getFileData = async (fileAbsolutePath: string): Promise<FileData> => {

  // get last modified date from disk
  const fileStat = await fs.stat(fileAbsolutePath);
  const lastModifiedDate = fileStat.mtimeMs;

  // get cached item from store (if present)
  const cachedItem = getFileDataCache.items[fileAbsolutePath];

  // if we have a cached value and not modified -> return cached value
  if (cachedItem && cachedItem.lastModifiedDate === lastModifiedDate) {
    return cachedItem.fileData;
  }

  // if modified or not cached -> read file, cache result -> return it
  const fileName = path.basename(fileAbsolutePath);
  const fileContent = await fs.readFile(fileAbsolutePath, "utf-8");
  getFileDataCache.items[fileAbsolutePath] = {
    lastModifiedDate,
    fileData: {
      fileName,
      fileContent,
      fileAbsolutePath,
      lastModifiedDate
    },
  };
  return getFileDataCache.items[fileAbsolutePath].fileData;

};