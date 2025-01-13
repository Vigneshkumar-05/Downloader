import { FaRegFileAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

function DownloadList() {
  const dataList = [
    {
      Filename: "Animated.gif",
      fileSize: 22 + " MB",
      Time: "03.56 pm",
    },
  ];

  return (
    <div className="h-[90%] w-[65%] overflow-auto">
      <span className="text-xl">Files</span>
      <div>
        {dataList.map((data, index) => (
          <div
            key={index}
            className="min-w-fit my-4 grid grid-cols-4 bg-gray-100 justify-end rounded-md shadow-sm"
          >
            {/* File name */}
            <div className="my-2 col-span-2 flex justify-around items-center">
              <FaRegFileAlt className="text-blue-500 text-3xl border-r-solid border-r-2 pr-2" />
              <div className="h-[115%] w-72 py-1 flex flex-col justify-between">
                <span className="w-fit text-md font-bold text-gray-800 cursor-pointer">
                  {data.Filename}
                </span>
                <span className="text-xs">{data.fileSize}</span>
              </div>
            </div>

            {/* File size */}
            <div className="flex justify-center mt-3">
              <span className="text-xs">{data.Time}</span>
            </div>

            {/* Options */}
            <div className="p-2 w-full flex justify-end items-start cursor-pointer">
              <HiOutlineDotsVertical className="text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadList;
