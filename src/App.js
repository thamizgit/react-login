import { useState } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Routes,Route } from 'react-router-dom';

import './App.css';
function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
   
    <Routes>
      <Route path="/" element={<Register isLoading={isLoading} setIsLoading={setIsLoading}/>} />
      <Route path="/login" element={<Login />}/>
      </Routes>
  
  
  );
}

export default App;
