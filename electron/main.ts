const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const initStream = require("./src/stream");
const file = require("./src/file");

let mainWindow: Electron.BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  const startUrl = process.env.isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../", "../ui/dist-react/index.html")}`;
  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.openDevTools();
}

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Inter process communication - IPC
type fileInfoType = {
  length: number;
  type: string;
};

interface FileDataType extends fileInfoType {
  chunk: Uint8Array[];
}

interface FilesListType extends fileInfoType {
  name: string;
}

let data: FileDataType | null = null;
let directoryPath = path.join(app.getPath("desktop"), "E-Downloads");

ipcMain.handle(
  "get-stream-data",
  async function (event: Electron.IpcMainInvokeEvent, url: string) {
    try {
      data = await initStream({ mainWindow, url });
    } catch (err) {
      console.log(err);
    }
  }
);

ipcMain.handle(
  "write-stream-data",
  async function (event: Electron.IpcMainInvokeEvent, args: []) {
    try {
      if (!data) {
        throw new Error("Invalid data for creating file");
      }
      await file.createFile(data.chunk, data.type, directoryPath);
    } catch (err) {
      console.log(err);
    }
  }
);

ipcMain.handle(
  "get-file-list",
  async function (event: Electron.IpcMainInvokeEvent, args: []) {
    try {
      return await file.getFileList(directoryPath);
    } catch (err) {
      console.log(err);
    }
  }
);

ipcMain.handle(
  "open-file",
  async function (event: Electron.IpcMainInvokeEvent, fileName: string) {
    try {
      const filePath = path.join(directoryPath, fileName);
      console.log(filePath);
      await file.openFile(filePath);
    } catch (err) {
      console.log(err);
    }
  }
);
