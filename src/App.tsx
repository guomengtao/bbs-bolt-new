import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { PublicBoard } from './pages/PublicBoard';
import { AdminBoard } from './pages/AdminBoard';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/" className="hover:text-gray-300">
            公共留言板
          </Link>
          <Link to="/admin" className="hover:text-gray-300">
            管理后台
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PublicBoard />} />
        <Route path="/admin" element={<AdminBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;