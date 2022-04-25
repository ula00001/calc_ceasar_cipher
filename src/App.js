import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Calc from './pages/Calc';
import Ceasar from './pages/Ceasar';
import Bar from './components/bar/Bar';
import LikeEnigma from './pages/LikeEnigma';
import TodoWrapper from './pages/TodoWrapper';
import Counter from './pages/Counter';
import Shop from './pages/shop/Shop'
import Page404 from './pages/404';
import './App.css';


function App() {

  return (
    <Router>
      <Bar />
      <main>
        <Routes>

          <Route path='/' element={<Calc />} />
          <Route path='ceasar' element={<Ceasar />} />
          <Route path='likeenigma' element={<LikeEnigma />} />
          <Route path='todo' element={<TodoWrapper />} />
          <Route path='counter' element={<Counter />} />
          <Route path='shop' element={<Shop />} />

          <Route path="*" element={<Page404 />} />

        </Routes>
      </main>
    </Router>
  );

}

export default App;
