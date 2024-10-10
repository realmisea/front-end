import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main";
import {Header} from "@components/Header.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
            <Header />
        </>
    )
}

export default App
