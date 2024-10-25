import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main';
import { Layout } from '@components/Layout.tsx';
import { MapPage } from '@pages/map';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<Layout />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
