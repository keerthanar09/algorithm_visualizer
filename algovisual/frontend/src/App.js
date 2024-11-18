// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BubbleSortVisualization from './components/bubblesort';
import MergeSortVisualization from './components/merge';
import QuickSortVisualization from './components/quick';
import SelectionSortVisualization from './components/selection';

function App() {
  return (
    <div>
      <h1>Algorithm Visualizer</h1>
    <Router>
      <Routes>
        import navbar from './components/navbar';
        import size.jsm from './components/size.jsm';
          <Route path="/bubble" element={<BubbleSortVisualization />} />
          <Route path="/merge" element={<MergeSortVisualization />} />
          <Route path="/quick" element={<QuickSortVisualization />} />
          <Route path="/select" element={<SelectionSortVisualization />} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;
