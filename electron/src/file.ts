const { shell } = require("electron");
const fs = require("fs");
const fpath = require("path");

type FileType = {
  name: string;
  length: number;
  type: string;
};

let fileCount: string | null = null;

const createFile = async (
  chunk: Uint8Array[],
  type: string,
  directoryPath: string
) => {
  try {
    const data = new Blob(chunk);
    // Ensure the directory exists
    await fs.promises.mkdir(directoryPath, { recursive: true });

    // filecount should the minute,second and millisecond
    fileCount = new Date().getTime().toString();

    const fileName = `New-file(${fileCount}).${type}`;

    const filePath = fpath.join(directoryPath, fileName);

    // Convert Blob to ArrayBuffer
    const buffer = await data.arrayBuffer();

    // Write the file to the disk
    await fs.promises.writeFile(filePath, Buffer.from(buffer));

    console.log(`File saved to ${filePath}`);
  } catch (err) {
    // Handle errors and log them
    console.error("Error saving the file:", err);
  }
};

const openFile = async (filePath: string) => {
  try {
    // open the file in default system application
    await shell.openExternal(filePath);
  } catch (err) {
    console.error("Error opening the file:", err);
  }
};

const deleteFile = async (filePath: string) => {
  try {
    await fs.promise.unlink(filePath);
  } catch (err) {
    console.error("Error deleting the file:", err);
  }
};

const renameFile = async (filePath: string, newFilePath: string) => {
  try {
    await fs.promises.rename(filePath, newFilePath);
  } catch (err) {
    console.error("Error renaming the file:", err);
  }
};

const getFileList = async (directoryPath: string) => {
  try {
    const files = await fs.promises.readdir(directoryPath);

    const fileList: FileType[] = files.map((file: string) => {
      const stats = fs.statSync(fpath.join(directoryPath, file));
      return {
        name: file.split(".")[0],
        length: stats.size,
        type: file.split(".")[1],
      };
    });

    return fileList;
  } catch (err) {
    return [];
  }
};

module.exports = { createFile, openFile, deleteFile, renameFile, getFileList };
