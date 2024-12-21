
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BubbleVizPage from './pages/BubbleViz';
import MergeVizPage from './pages/MergeSortViz';
import QuickVizPage from './pages/QuickSortViz';
import SelVizPage from './pages/SelSort';
import AlgorithmList from './pages/AlgList';
import Carousal2 from './components/UI/carousal2';
import Home from './pages/Home';
import PathFindingListPage from './pages/Pathfindlist';
import BellmanVizPage from './pages/Bellman';
import DijViz from './pages/DjViz';
import BFSVisPage from './pages/bfsviz';


function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Sortinglist" element={<AlgorithmList/>} />
          <Route path="/pflist" element={<PathFindingListPage/>} />
          <Route path="/bubble" element={<BubbleVizPage />} />
          <Route path="/merge" element={<MergeVizPage />} />
          <Route path="/quick" element={<QuickVizPage />} />
          <Route path="/select" element={<SelVizPage />} />
          <Route path="/test" element={<Carousal2 />} />
          <Route path="/bellman" element={<BellmanVizPage/>}/>
          <Route path="/dj" element={<DijViz/>}/>
          <Route path="/bfs" element={<BFSVisPage/>}/>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
