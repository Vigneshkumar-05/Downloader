function Info({
  ContentLength,
  ContentType,
}: {
  ContentLength: string | null;
  ContentType: string | null;
}) {
  return (
    <div className="h-full w-full p-8 rounded-3xl shadow-[inset_7px_7px_14px_#d4d6d9,inset_-7px_-7px_14px_#ffffff]">
      <span className="font-medium text-xl">Info</span>
      <div className="w-[80%] h-[70%] ml-10 mt-2 flex flex-col justify-start items-start">
        <div className="w-full p-2 flex justify-between">
          <span>Content-Type </span>
          <span> {ContentType}</span>
        </div>

        <div className="w-full p-2 flex justify-between">
          <span>Content-Length</span>
          <span> {ContentLength}</span>
        </div>
      </div>
    </div>
  );
}

export default Info;
