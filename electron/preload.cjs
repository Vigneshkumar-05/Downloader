const { contextBridge, ipcRenderer } = require("electron");

const communication_api = {
    getProgressData: (setProgress, setFileInfo, url) => {
        ipcRenderer.on("progress-data", (event, data) => {
            setProgress(data);
        });

        ipcRenderer.on("fileInfo", (event, data) => {
            setFileInfo(data);
        });

        ipcRenderer.invoke("download-url", url);
    },
}

contextBridge.exposeInMainWorld("api", communication_api); 