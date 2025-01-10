import React, { useState } from "react";

function Form({ url, setUrl, setFileInfo, recentURL, setRecentURL }: FormType) {
  const [progress, setProgress] = useState(0);

  function handleCancel() {
    console.log("Clicked cancel");
  }

  async function handleSubmit(e: EventType): Promise<void> {
    e.preventDefault();
    if (url === "") return;

    window.api.getProgressData(setProgress, setFileInfo, url);

    setTimeout(() => {
      setProgress(0);
      setUrl("");

      if (recentURL.length > 2) {
        setRecentURL(recentURL.slice(0, -1));
      }
      setRecentURL([url, ...recentURL]);
    }, 1000);

    setTimeout(() => {
      setFileInfo({
        ContentType: "null",
        ContentLength: "null",
      });
    }, 3000);
  }

  return (
    <div className="min-h-[300px] h-full flex justify-center items-center row-span-3 rounded-3xl shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]">
      <form
        onSubmit={handleSubmit}
        className="min-h-[200px] min-w-fit h-[30%] w-[80%] flex flex-col justify-around items-center"
      >
        <input
          type="url"
          id="url-input"
          value={url}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(event.target.value)
          }
          placeholder="Enter URL"
          className="min-h-[50px] min-w-fit w-full px-10 text-md outline-none text-center rounded-full bg-transparent shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]"
        />
        {progress ? (
          <div className="h-[50%] w-[90%] flex flex-col justify-between items-center">
            <div className="w-[55%] min-w-fit flex justify-evenly items-center">
              <span>Downloading</span>
              <span>{progress} %</span>
            </div>
            <progress id="progressbar" value={progress} max={100}></progress>
            <span
              className="px-3 py-1 rounded-full cursor-pointer shadow-[9.91px_9.91px_15px_#D9DADE,-9.91px_-9.91px_15px_#FFFFFF] active:shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]"
              onClick={handleCancel}
            >
              Cancel
            </span>
          </div>
        ) : (
          <input
            id="downloadButton"
            type="button"
            className="w-[35%] p-3 rounded-full cursor-pointer shadow-[9.91px_9.91px_15px_#D9DADE,-9.91px_-9.91px_15px_#FFFFFF] active:shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]"
            value={"Download"}
            onClick={handleSubmit}
          />
        )}
      </form>
    </div>
  );
}

export default Form;

type FileInfoType = {
  ContentType: string | null;
  ContentLength: string | null;
};

type EventType =
  | React.FormEvent<HTMLFormElement>
  | React.MouseEvent<HTMLInputElement>;

type FormType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfoType>>;
  recentURL: string[];
  setRecentURL: React.Dispatch<React.SetStateAction<string[]>>;
};
