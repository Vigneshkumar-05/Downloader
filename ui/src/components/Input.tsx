import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";

type ProgressBarPropsType = {
  progress: number;
};

type InputPropsType = {
  updateFileList: () => void;
};

const ProgressBar = ({ progress }: ProgressBarPropsType) => {
  return (
    <div className="w-full h-1 bg-slate-100">
      <div
        className="h-full bg-green-400"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const Input = ({ updateFileList }: InputPropsType): JSX.Element => {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (url) {
      window.api.readStreamResponse(url, setProgress);
      setUrl("");
    }
  };

  const writeStream = async () => {
    try {
      await window.api.writeStreamResponse();
      updateFileList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Math.floor(progress) === 100.0) {
      writeStream();
      setProgress(0);
    }
  }, [progress]);

  return (
    <section className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="min-w-[10rem] w-[70%] h-14 flex items-center bg-[#fafafa]"
      >
        <input
          className="w-[96%] h-full text-center focus:outline-slate-500 bg-[#fafafa]"
          type="url"
          value={url}
          placeholder={progress ? "Downloading..." : "Enter URL"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(event.target.value)
          }
          disabled={progress > 0}
        />
        <MdOutlineFileDownload
          type="submit"
          onClick={handleSubmit}
          className="h-full mx-2 text-2xl text-gray-500 cursor-pointer"
        />
      </form>
      <div className="w-[70%]">
        {progress > 0 && <ProgressBar progress={progress} />}
      </div>
    </section>
  );
};

export default Input;

// https://cdn.pixabay.com/video/2019/02/07/21222-316092837_large.mp4
