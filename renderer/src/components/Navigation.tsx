import { IoHomeOutline } from "react-icons/io5";
import { LiaDownloadSolid } from "react-icons/lia";
import { RiArrowDropRightLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

function Navigation(): JSX.Element {
  function handleRoute(route: string) {
    window.location.href = route;
  }

  return (
    <nav className="h-screen grid grid-rows-10 bg-gray-800 text-white rounded-r-md">
      <div className="text-xl font-extrabold flex items-center justify-center rounded-t-xl">
        <span className="after:content-[''] after:w-[100%] after:border-2 after:border-solid after:border-gray-500 after:flex after:rounded-xl">
          URI
        </span>
      </div>

      <div className="row-span-8 w-[98%] p-2">
        {/* Home */}
        <ul
          onClick={() => handleRoute("/home")}
          className="cursor-pointer grid grid-flow-col grid-col-3 items-center mt-1"
        >
          <IoHomeOutline />
          <div className=" flex justify-end">
            <span>Home</span>
          </div>
          <div className="flex justify-end ">
            <RiArrowDropRightLine />
          </div>
        </ul>

        {/* Downloads */}
        <ul
          onClick={() => handleRoute("/downloads")}
          className=" cursor-pointer mt-5 grid grid-flow-col grid-col-3 items-center"
        >
          <LiaDownloadSolid />
          <div className="flex justify-end">Downloads</div>
          <div className="flex justify-end">
            <RiArrowDropRightLine />
          </div>
        </ul>

        {/* Settings */}
        <ul
          onClick={() => handleRoute("settings")}
          className=" cursor-pointer mt-5 grid grid-flow-col grid-col-3 items-center"
        >
          <IoSettingsOutline />
          <div className="flex justify-end">Settings</div>
          <div className="flex justify-end">
            <RiArrowDropRightLine />
          </div>
        </ul>
      </div>

      <div className="px-3 flex justify-around items-center cursor-pointer">
        <span>John Doe</span>
        <HiOutlineUserCircle className="text-2xl" />
      </div>
    </nav>
  );
}

export default Navigation;
