import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import FilesList from "./components/FilesList";

type FileListType = {
  name: string;
  length: number;
  type: string;
}[];

declare global {
  interface Window {
    api: {
      readStreamResponse: (url: string, setProgress: Function) => void;
      writeStreamResponse: () => void;
      getFileList: () => Promise<FileListType>;
      openFile: (fileName: string) => void;
      // deleteFile: (fileName: string) => void;
      // renameFile: () => void;
    };
  }
}

const App: React.FunctionComponent = () => {
  const [files, setFiles] = useState<FileListType>([]);

  const updateFileList = async () => {
    try {
      const files = await window.api.getFileList();
      setFiles(files);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateFileList();
  }, []);

  return (
    <div className="w-screen h-screen p-5 grid grid-cols-[repeat(2,minmax(fit-content,1fr))] grid-flow-row sm:grid-flow-col font-poppins">
      <Input updateFileList={updateFileList} />
      <FilesList files={files} />
    </div>
  );
};

export default App;
