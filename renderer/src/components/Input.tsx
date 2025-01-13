import { MdOutlineFileDownload } from "react-icons/md";

function Input(): JSX.Element {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Clicked");
  }

  return (
    <div className="my-2 flex justify-center items-center">
      <form
        className="w-[50%] h-12 px-5 flex justify-around items-center bg-gray-100 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="h-full text-center w-[90%] bg-gray-100 outline-none"
          placeholder="Search"
        />
        <MdOutlineFileDownload
          type="submit"
          className="text-xl text-gray-600 cursor-pointer"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Input;
