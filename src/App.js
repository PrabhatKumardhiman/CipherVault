import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './component/Navbar';
import Homepage from './component/pages/Homepage';
import Login from './component/pages/Login';
import Signup from './component/pages/Signup';
import { useState } from 'react';

function App() {
  const [state, setState] = useState("initialState")


  return (
    <Router>
      <div className="App">
        <header>
          <Navbar state = {state} />
        </header>
        <section>
          <Routes>
            <Route exact path="/" element={<Homepage state = {setState}/>}> </Route>
            <Route exact path="/login" element={<Login state = {setState}/>}> </Route>
            <Route exact path="/signup" element={<Signup state = {setState}/>}> </Route>
          </Routes>
        </section>
        <footer>
          <div className="footer container">

          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;