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

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/bubble" element={<BubbleSortVisualization />} />
          <Route path="/merge" element={<MergeSortVisualization />} />
      </Routes>
    </Router>
  );
}
export default App;
