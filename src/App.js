import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calc from './pages/Calc';
import Ceasar from './pages/Ceasar';
import Bar from './components/bar/Bar';
import LikeEnigma from './pages/LikeEnigma';
import TodoWrapper from './pages/TodoWrapper';
import Counter from './pages/Counter';
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

        </Routes>
      </main>
    </Router>
  );

}

export default App;
