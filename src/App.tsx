import {MainPage} from "./pages/main";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
