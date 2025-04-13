import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateForm from './pages/CreateForm';
import SavedForms from './pages/SavedForms';
import DynamicForm from './pages/DynamicForm';
import ThankYou from './pages/Thankyou';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/forms" element={<SavedForms />} />
          <Route path="/form/:id" element={<DynamicForm />} />
          <Route path="/thank-you" element={<ThankYou />} /> {/* Add Thank You page route */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2000} // Close after 3 seconds
        hideProgressBar={true} // Hide the progress bar for a cleaner look
        closeOnClick
        pauseOnHover
        draggable
        theme="light" // Use a light theme
        style={{
          fontSize: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
    </>
  );
}

export default App;
