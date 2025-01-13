import Home from "./pages/Home.tsx";
import Navigation from "./components/Navigation.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Downloads from "./pages/Downloads.tsx";
import Settings from "./pages/Settings.tsx";

function App(): JSX.Element {
  return (
    <div className="max-w-screen max-h-screen grid grid-cols-[minmax(4rem,10rem),1fr] font-poppins">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
