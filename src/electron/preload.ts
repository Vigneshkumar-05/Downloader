import { contextBridge, ipcRenderer } from "electron";

const communication_api = {
  readResponse: (url: string, setProgress: Function) => {
    ipcRenderer.on(
      "progress-data",
      async function (event: Electron.IpcRendererEvent, progress: number) {
        await setProgress(progress);
      }
    );

    ipcRenderer.invoke("get-stream-data", url);
  },

  writeResponse: async () => {
    const response = await ipcRenderer.invoke("save-file");
    return response;
  },

  // openFile: async (path: string) => await ipcRenderer.invoke("open-file", path),
};

contextBridge.exposeInMainWorld("api", communication_api);
