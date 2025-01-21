import { contextBridge, ipcRenderer } from "electron";

const communication_api = {
  readStreamResponse: (url: string, setProgress: Function) => {
    ipcRenderer.on(
      "progress-data",
      async function (event: Electron.IpcRendererEvent, progress: number) {
        await setProgress(progress);
      }
    );

    ipcRenderer.invoke("get-stream-data", url);
  },

  writeStreamResponse: async () =>
    await ipcRenderer.invoke("write-stream-data"),

  getFileList: async () => {
    const response = await ipcRenderer.invoke("get-file-list");
    return response;
  },

  openFile: (fileName: string) => {
    ipcRenderer.invoke("open-file", fileName);
  },

  deleteFile: () => {
    ipcRenderer.invoke("delete-file");
  },

  renameFile: () => {
    ipcRenderer.invoke("rename-file");
  },
};

contextBridge.exposeInMainWorld("api", communication_api);
