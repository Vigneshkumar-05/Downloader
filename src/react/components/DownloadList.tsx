import { useContext } from "react";

import { FileInfoContext } from "../context/FileInfoContext";
import ListItems from "./ListItems";

function DownloadList(): JSX.Element {
  const context = useContext(FileInfoContext);

  if (!context) {
    throw new Error("No context found");
  }

  const { fileInfo } = context;

  return (
    <div className="w-full h-full overflow-auto">
      <span className="text-lg">Files</span>
      <div>
        <ListItems downloadData={fileInfo} />
      </div>
    </div>
  );
}

export default DownloadList;
