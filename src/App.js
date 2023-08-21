import logo from './logo.svg';

import './App.css';
import  Webapp  from './components/webapp'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Definir tus rutas y componentes */}
      <Route path="/" element={<Webapp/>}/>
      <Route path="/webhook" element={<Webapp/>} />
      <Route path="/home" element={<Webapp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
