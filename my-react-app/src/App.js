import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import LoginForm from "./routes/LoginForm"; 
import StudentDashboard from "./components/Student/StudentDashboard";
import AdminDash from "./components/Admin/AdminDash";
import AddStudent from "./components/Admin/AddStudent";


export default function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">

      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
         
          <Route
            path="/login"
            element={<LoginForm onSubmit={handleFormSubmit} />}
          />
          <Route path="/Login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={<StudentDashboard {...formData} />}
          />
          <Route
            path="/AdminDash"
            element={<AdminDash {...formData} />}
          />
          <Route
            path="/AddStudent"
            element={<AddStudent {...formData} />}
            />

        </Routes>
      </div>
      <div className="bottom-buttons"></div>
    </div>
  );
}
