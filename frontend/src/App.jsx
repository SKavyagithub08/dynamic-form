import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateForm from './pages/CreateForm';
import AllForms from './pages/SavedForms';
import DynamicForm from './pages/DynamicForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/forms" element={<AllForms />} />
        <Route path="/form/:id" element={<DynamicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
