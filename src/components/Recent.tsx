import React from "react";

function Recent({
  recentURL,
}: {
  recentURL: string[];
}): React.FunctionComponentElement<string> {
  return (
    <div className="w-full h-full p-8 row-span-2 flex flex-col justify-around rounded-3xl shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]">
      <span className="text-lg font-medium">Recent</span>
      <div className="max-h-[80%] min-h-[75%] min-w-[95%] border-solid overflow-y-auto overflow-x-hidden">
        {recentURL.map(
          (url, index) =>
            url && (
              <div
                key={index}
                className="flex justify-start items-baseline break-all"
              >
                <span className="px-2 mt-3">&#10024;</span>
                <p>{url} </p>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Recent;
