import { FaRegFileAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

type DownloadDataType = {
  fileName: string;
  fileSize: string;
  fileType: string;
}[];

function ListItems({
  downloadData,
}: {
  downloadData: DownloadDataType;
}): JSX.Element {
  function handleFileOpen(index: number): void {
    try {
      console.log(index);
      // window.api.openFile(downloadData[index].fileName);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section>
      {downloadData.map((data, index) => (
        <div
          key={index}
          className="mt-3 h-20 grid grid-flow-col grid-cols-[5rem_repeat(3,1fr)_5rem] grid-row-1 bg-gray-100 rounded-md shadow-md"
        >
          <div className="flex justify-center items-center separater">
            <FaRegFileAlt
              className="text-3xl text-blue-500 cursor-pointer"
              onClick={() => {
                handleFileOpen(index);
              }}
            />
          </div>

          <div className="col-span-2 flex flex-col justify-evenly p-2">
            <span
              className="text-lg font-bold cursor-pointer"
              onClick={() => {
                handleFileOpen(index);
              }}
            >
              {data.fileName}
            </span>
            <span className="text-xs">{data.fileSize}</span>
          </div>

          <div className="flex justify-center items-center text-xs">
            <span>{data.fileType}</span>
          </div>

          <div className="flex justify-center items-center">
            <MdDeleteOutline className="text-3xl text-red-500 cursor-pointer" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListItems;
