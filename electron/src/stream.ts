type getResponseDataParamType = {
  mainWindow: Electron.BrowserWindow;
  url: string;
};

type getResponseDataReturnType = {
  chunk: Uint8Array[];
  length: number;
  type: string;
};

const getResponseData = async ({
  mainWindow,
  url,
}: getResponseDataParamType): Promise<getResponseDataReturnType> => {
  try {
    if (!mainWindow) {
      throw new Error("Mainwindow has null value");
    }

    const response = await fetch(url);

    if (!response.body) {
      throw new Error("Missing response body");
    }

    const chunk = [];
    let type = response.headers.get("Content-Type");
    const length = response.headers.get("Content-Length");

    if (!type) {
      throw new Error("Type of the response file is undefined");
    }

    type = type.split("/")[1];

    if (!length) {
      throw new Error("Length of the response file is undefined");
    }

    const totalLength = parseInt(length);
    let recievedLength = 0;

    const reader = response.body.getReader();

    if (!reader) {
      throw new Error("Reader failed");
    }

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

    return {
      chunk: chunk,
      length: totalLength,
      type: type,
    };
  } catch (err) {
    console.log("Error occured in getResponseData: ", err);
    throw err;
  }
};

module.exports = getResponseData;
