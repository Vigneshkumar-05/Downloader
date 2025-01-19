import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";

import { FileInfoProvider } from "./context/FileInfoContext";

function App(): JSX.Element {
  return (
    <FileInfoProvider>
      <div className="max-w-screen max-h-screen grid grid-cols-[minmax(4rem,10rem),1fr] font-poppins">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </div>
    </FileInfoProvider>
  );
}

export default App;
