import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Board from './components/board/Board';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/board' element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
