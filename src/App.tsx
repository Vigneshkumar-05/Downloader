import React, { useState } from "react";

import Form from "./components/Form.tsx";
import Info from "./components/Info.tsx";
import Recent from "./components/Recent.tsx";

function App(): React.FunctionComponentElement<{}> {
  const [url, setUrl] = useState("");
  const [fileInfo, setFileInfo] = useState<FileInfoType>({
    ContentType: "null",
    ContentLength: "null",
  });

  const [recentURL, setRecentURL] = useState([""]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#EEF0F4]  text-gray-800">
      <div className="md:w-[60%] sm:w-full grid grid-rows-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Form
          url={url}
          setUrl={setUrl}
          setFileInfo={setFileInfo}
          recentURL={recentURL}
          setRecentURL={setRecentURL}
        />
        <Info
          ContentType={fileInfo.ContentType}
          ContentLength={fileInfo.ContentLength}
        />
        <Recent recentURL={recentURL} />
      </div>
    </div>
  );
}

export default App;

type FileInfoType = {
  ContentLength: string | null;
  ContentType: string | null;
};
