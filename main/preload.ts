const { contextBridge, ipcRenderer } = require("electron");

const communication_api = {
  getProgressData: (
    setProgress: Function,
    setFileInfo: Function,
    url: string
  ) => {
    ipcRenderer.on(
      "progress-data",
      (event: Electron.IpcRendererEvent, data: number) => {
        setProgress(data);
      }
    );

    ipcRenderer.on(
      "fileInfo",
      (
        event: Electron.IpcRendererEvent,
        data: {
          ContentType: string | null;
          ContentLength: string | null;
        }
      ) => {
        setFileInfo(
          (prev: {
            ContentType: string | null;
            ContentLength: string | null;
          }) => (prev = data)
        );
      }
    );

    ipcRenderer.invoke("download-url", url);
  },
};

contextBridge.exposeInMainWorld("api", communication_api);
