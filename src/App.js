import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calc from './pages/Calc';
import Ceasar from './pages/Ceasar';
import Bar from './components/bar/Bar';
import './App.css';


function App() {

  return (
    <Router>
      <Bar />
      <main>
        <Routes>

          <Route path='/' element={<Calc />} />
          <Route path='ceasar' element={<Ceasar />} />

        </Routes>
      </main>
    </Router>
  );

}

export default App;
