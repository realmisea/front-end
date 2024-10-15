import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main';
import { SuggestionModal } from '@components/SuggestionModal.tsx';
import { Header } from '@components/Header.tsx';
import { DetailModal } from './components/DetailModal.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
      <Header />
      <SuggestionModal />
      <DetailModal />
    </>
  );
}

export default App;
