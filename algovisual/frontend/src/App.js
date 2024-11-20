
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import BubbleVizPage from './pages/BubbleViz';
import MergeVizPage from './pages/MergeSortViz';
import QuickVizPage from './pages/QuickSortViz';
import SelVizPage from './pages/SelSort';
import AlgorithmList from './pages/AlgList';


function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path="/" element={<Navbar />} />          
          <Route path="/Sortinglist" element={<AlgorithmList/>} />
          <Route path="/bubble" element={<BubbleVizPage />} />
          <Route path="/merge" element={<MergeVizPage />} />
          <Route path="/quick" element={<QuickVizPage />} />
          <Route path="/select" element={<SelVizPage />} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;
