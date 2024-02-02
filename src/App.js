// import logo from './logo.svg';
// import './App.css';
// import Navigation from './navigation/Navigation';
// import Header from './components/Header';
// import HomeContainer from './services/homeContainer';
// import { Counter } from './features/counter/Counter';

// function App() {
//   return (
//     <div className="App"> 
//       <Counter/>
//       {/* <Navigation/> */}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Navigate } from 'react-router-dom';
import Navigation from './navigation/Navigation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navigation/>
      </header>
    </div>
  );
}

export default App;
