import Input from "../components/Input.tsx";
import DownloadList from "../components/DownloadList.tsx";

function Home(): JSX.Element {
  return (
    <div className="max-h-screen">
      <Input />
      <div className="h-[90%] flex justify-center items-center">
        <DownloadList />
      </div>
    </div>
  );
}

export default Home;
