import { createContext, useState } from "react";

type FileInfoType = {
  fileName: string;
  fileSize: string;
  fileType: string;
};

type FileInfoContextType = {
  fileInfo: FileInfoType[];
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfoType[]>>;
};

type FileInfoPropsType = {
  children: React.ReactNode;
};

const FileInfoContext = createContext<FileInfoContextType | undefined>(
  undefined
);

function FileInfoProvider({ children }: FileInfoPropsType) {
  const [fileInfo, setFileInfo] = useState<FileInfoType[]>([]);

  return (
    <FileInfoContext.Provider value={{ fileInfo, setFileInfo }}>
      {children}
    </FileInfoContext.Provider>
  );
}

export { FileInfoProvider, FileInfoContext };
