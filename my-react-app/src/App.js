import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import SignupForm from "./routes/SignupForm"; // Import your SignupForm component
import LoginForm from "./routes/LoginForm"; // Import your LoginForm component
import StudentDashboard from "./routes/StudentDashboard";


export default function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <div>
        <h1>Welcome!</h1>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/signup"
            element={<SignupForm onSubmit={handleFormSubmit} />}
          />
          <Route path="/Login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={<StudentDashboard {...formData} />}
          />
        </Routes>
      </div>
      <div className="bottom-buttons"></div>
    </div>
  );
}
