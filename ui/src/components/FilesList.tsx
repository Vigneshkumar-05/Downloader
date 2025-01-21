import { useState } from "react";

import { FaFileDownload } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

type FileDataType = {
  name: string;
  length: number;
  type: string;
};

type FilesListPropsType = {
  files: FileDataType[];
};

const FilesList = ({ files }: FilesListPropsType) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleOpenFile = (index: number) => {
    window.api.openFile(files[index].name + "." + files[index].type);
  };

  const handleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  if (!files) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-3 ">
      <h1 className="text-xl ">Downloads</h1>
      <section className="h-[97%] flex flex-col items-center overflow-auto">
        <div className="w-full">
          {files.length === 0 ? (
            <div className="flex justify-center items-center">
              <p>No files</p>
            </div>
          ) : (
            <div className="w-full">
              {files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className="min-w-fit w-[70%] p-2 m-3 grid grid-col-[1em_repeat(3,1fr)_1em] grid-flow-col bg-[#fafafa] hover:shadow-md"
                  >
                    <div className="min-w-fit flex justify-center items-center">
                      <FaFileDownload className="text-violet-800" />
                    </div>

                    <div className=" min-w-fit px-3 col-span-2">
                      <p
                        className="py-1 text-sm cursor-pointer"
                        onClick={() => {
                          handleOpenFile(index);
                        }}
                      >
                        {file.name}
                      </p>
                      <p className="py-1 text-xs">
                        {(file.length / 1048576).toFixed(2) + " mb"}
                      </p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="text-sm">.{file.type}</p>
                    </div>

                    <div className="px-3 flex justify-end items-center">
                      <SlOptionsVertical
                        className="text-sm text-gray-600 cursor-pointer"
                        onClick={handleDropDown}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FilesList;
