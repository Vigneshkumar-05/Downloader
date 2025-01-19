import { useContext } from "react";
import { FileInfoContext } from "../context/FileInfoContext";

import Input from "../components/Input";
import DownloadList from "../components/DownloadList";

declare global {
  interface Window {
    api: {
      readResponse: (
        url: string,
        setProgress: React.Dispatch<React.SetStateAction<number>>
      ) => void;

      writeResponse: () => Promise<DataType>;
    };
  }
}

type DataType = {
  fileName: string;
  fileSize: string;
  fileType: string;
}[];

function Home(): JSX.Element {
  const context = useContext(FileInfoContext);

  if (!context) {
    throw new Error("No context found");
  }

  const { fileInfo } = context;

  return (
    <div className="max-h-screen">
      <Input />
      <div className="h-[90%] w-[65%] m-auto p-3">
        {fileInfo.length > 0 ? <DownloadList /> : null}
      </div>
    </div>
  );
}

export default Home;
