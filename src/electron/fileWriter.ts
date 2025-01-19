"use strict";

import fs from "fs";
import path from "path";

async function createFile(data: Blob, directoryPath: string, fileType: string) {
  try {
    // Ensure the directory exists
    await fs.promises.mkdir(directoryPath, { recursive: true });

    const filePath = path.join(directoryPath, `Newfile.${fileType}`);

    // Convert Blob to ArrayBuffer
    const buffer = await data.arrayBuffer();

    // Write the file to the disk
    await fs.promises.writeFile(filePath, Buffer.from(buffer));
    console.log(`File saved to ${filePath}`);
  } catch (err) {
    // Handle errors and log them
    console.error("Error saving the file:", err);
  }
}

export default createFile;
