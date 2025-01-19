import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import saveFile from "./fileWriter.js";

// Main window object with a placeholder value
let mainWindow: BrowserWindow | null = null;

// child window object with a placeholder value
// when the new url was entered and it has a specific header response, the child window will be created
let fileNameWindow: BrowserWindow | null = null;

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log("__dirname: ", __dirname);

// creates the main window of the app
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    // wait for the application to load completely and show the ui
    show: false,
    webPreferences: {
      // special script execute(sandboxing) before the renderer and act as a bridge between the renderer and the main process
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // react dev server
  // only for dev

  if (process.env.isDev) {
    mainWindow.loadURL("http://localhost:5173");
  }

  // if the mainwindow is loaded and ready to show, it is allowed to show.
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  mainWindow.webContents.openDevTools();
}

// whenReady is a promise, successful when the application runs without any error
app
  .whenReady()
  .then(() => {
    createWindow();

    // effectively used for mac OS system and also makes more consistent in other operating systems
    // in mac, if the app icon is clicked from the dock or brought to the foreground, the default behaviour
    // is not to create a new window. But in other platforms they creates a new window, it will explicity indicates the
    // creation of new window (may ensures consistent)
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

// Exception for the Mac OS systems
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Inter process communication
let chunk: Uint8Array[] | null = null;
let recievedLength: number = 0;

let ContentType: string | null = null;
let ContentLength: string | null = null;
let totalLength: number | boolean | null = null;
let fileType: string | null = null;

ipcMain.handle(
  "get-stream-data",
  async function (event: Electron.IpcMainInvokeEvent, url: string) {
    // fetch api - to initiate network request
    const response = await fetch(url);
    console.log("Response: ", response);

    try {
      // response is a Response object returned from a fetch api call
      // response.body represents the stream of data(ReadableStream) which contains the stream of data
      if (!response.body) {
        throw new Error("Response body is missing");
      }

      const reader = response.body.getReader();

      if (!reader) {
        throw new Error("Failed to initialize the reader");
      }

      if (!mainWindow) {
        throw new Error("Main window object contains null value");
      }

      ContentType = response.headers.get("Content-Type");
      ContentLength = response.headers.get("Content-Length");
      totalLength =
        typeof ContentLength === "string" && parseInt(ContentLength);

      console.log(
        "Content Type: ",
        ContentType,
        "\nContent Length: ",
        totalLength
      );

      chunk = [];

      while (true) {
        // reads the stream of data
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunk.push(value);
        recievedLength += value.length;

        if (typeof totalLength === "number") {
          const step = ((recievedLength / totalLength) * 100).toFixed(2);
          mainWindow.webContents.send("progress-data", step);
        }
      }

      recievedLength = 0;
    } catch (error) {
      console.error("Stream error: ", error);
    }
  }
);

ipcMain.handle(
  "save-file",
  function (event: Electron.IpcMainInvokeEvent, args: []) {
    try {
      if (!chunk) {
        throw new Error("Chunk is missing");
      }
      if (!ContentType || !ContentType.includes("/")) {
        throw new Error("Invalid content Type");
      }

      fileType = ContentType.split("/")[1];

      const data = new Blob(chunk);

      const desktopPath = app.getPath("documents");
      const directoryPath = path.join(desktopPath, "electron-downloads");

      saveFile(data, directoryPath, fileType);

      return {
        fileName: "Newfile",
        fileSize:
          typeof totalLength === "number"
            ? (totalLength / 1048576).toFixed(3) + " MB"
            : "NaN",
        fileType: fileType,
      };
    } catch (error) {
      console.error("Get file info error: ", error);
    }
  }
);

// ipcMain.handle(
//   "open-file",
//   function (event: Electron.IpcMainEvent, path: string) {}
// );
