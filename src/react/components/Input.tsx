import { useState, useContext, useEffect } from "react";
import { FileInfoContext } from "../context/FileInfoContext";
import { MdOutlineFileDownload } from "react-icons/md";
import ProgressBar from "./ProgressBar";

type DataType = {
  fileName: string;
  fileSize: string;
  fileType: string;
}[];

type UpdatefileInfoType = {
  setFileInfo: React.Dispatch<React.SetStateAction<DataType>>;
  response: DataType;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

function Input(): JSX.Element {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const context = useContext(FileInfoContext);

  function updatefileInfo({
    setFileInfo,
    response,
    setProgress,
  }: UpdatefileInfoType): void {
    setFileInfo((prev) => prev.concat(response));
    setProgress(0);
  }

  async function showFileList(): Promise<void> {
    const response = await window.api.writeResponse();

    if (!context) {
      throw new Error("No context found");
    }
    const { setFileInfo } = context;

    updatefileInfo({ setFileInfo, response, setProgress });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (url) {
      window.api.readResponse(url, setProgress);

      setTimeout(() => {
        setUrl("");
      }, 2000);
    }
  }

  useEffect(() => {
    if (Math.floor(progress) === 100) {
      showFileList();
    }
  }, [progress]);

  return (
    <section className="my-3 flex flex-col justify-center items-center">
      <form
        className="w-[50%] h-12 px-5 flex justify-around items-center bg-gray-100 rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          value={url}
          className="h-full text-center w-[90%] bg-gray-100 outline-none"
          placeholder="Search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(event.target.value)
          }
        />
        <MdOutlineFileDownload
          type="submit"
          className="text-xl text-gray-600 cursor-pointer"
          onClick={handleSubmit}
        />
      </form>
      <div className="w-[49%]">
        {progress > 0 && <ProgressBar progress={progress} />}
      </div>
    </section>
  );
}

export default Input;

// https://cdn.pixabay.com/video/2019/02/07/21222-316092837_large.mp4
