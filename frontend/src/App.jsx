import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateForm from './pages/CreateForm';
import DynamicForm from './pages/DynamicForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/form/:id" element={<DynamicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
