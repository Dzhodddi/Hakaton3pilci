import { Routes, Route } from 'react-router-dom';
import './App.css'

import HomePage from './pages/HomePage';
import CreateProfilePage from './pages/CreateProfilePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/newprofile' element={<CreateProfilePage />} />
    </Routes>
  );
}

export default App
