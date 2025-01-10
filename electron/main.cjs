const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: "800px",
    height: "600px",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWindow.loadURL("http://localhost:5173/");

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

ipcMain.handle("download-url", async function (event, url) {
  const response = await fetch(url, {
    mode: "no-cors",
  });
  const reader = response.body?.getReader();
  if (!reader) {
    return "Reader initialization error";
  }

  let chunk = [];
  let recievedLength = 0;

  const ContentType = response.headers.get("Content-Type");
  const ContentLength = response.headers.get("Content-Length");

  const totalLength =
    typeof ContentLength === "string" && parseInt(ContentLength);

  function getContentType(ContentType) {
    return ContentType.substring(
      ContentType.indexOf("/") + 1,
      ContentType.length
    );
  }

  const fileType = getContentType(ContentType);

  mainWindow.webContents.send("fileInfo", {
    ContentType: ContentType,
    ContentLength: (totalLength / 1048576).toFixed(3) + " MB",
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    chunk.push(value);
    recievedLength += value.length;

    const step = ((recievedLength / totalLength) * 100).toFixed(2);
    mainWindow.webContents.send("progress-data", step);
  }

  const data = new Blob(chunk);

  const desktopPath = app.getPath("documents");
  const directoryPath = path.join(desktopPath, "electron-downloads");

  fs.promises
    .mkdir(directoryPath, { recursive: true })
    .then(() => {
      const filePath = path.join(directoryPath, `downloaded-data.${fileType}`);

      data
        .arrayBuffer()
        .then((buffer) => {
          fs.promises
            .writeFile(filePath, Buffer.from(buffer))
            .then(() => {
              console.log(`File saved to ${filePath}`);
            })
            .catch((err) => {
              console.error("Error writing the file:", err);
            });
        })
        .catch((err) => {
          console.error("Error converting Blob to buffer:", err);
        });
    })
    .catch((err) => {
      console.error("Error creating directory:", err);
    });
});
