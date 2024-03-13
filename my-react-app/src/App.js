import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import LoginForm from "./routes/LoginForm"; 
import StudentDashboard from "./components/Student/StudentDashboard";
import PlacementDash from "./components/Placement_coor/PlacementDash";
import EmployerPage from "./components/Placement_coor/Employer";
import StudentManagement from "./components/Placement_coor/ManageStudent"
import JobPostingForm from "./components/Placement_coor/Postjob";
import TrainingPage from "./components/Placement_coor/Training";
import ProgressTracker from "./components/Placement_coor/Progress";
import InterviewScheduler from "./components/Placement_coor/Schedule";



export default function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
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
            path="/StudentDashboard"
            element={<StudentDashboard {...formData} />}
          />
           <Route
            path="/PlacementDash"
            element={<PlacementDash {...formData} />}
          />
            <Route
            path="/EmployerPage"
            element={<EmployerPage {...formData} />}
            />

            <Route
            path="/StudentManagement"
            element={<StudentManagement {...formData} />}
            />
            <Route
            path="/JobPostingForm"
            element={<JobPostingForm {...formData} />}
            />
             <Route
            path="/TrainingPage"
            element={<TrainingPage {...formData} />}
            />
            <Route
            path="/ProgressTracker"
            element={<ProgressTracker {...formData} />}
            />
             <Route
            path="/InterviewScheduler"
            element={<InterviewScheduler {...formData} />}
            />

        </Routes>
      </div>
      <div className="bottom-buttons"></div>
    </div>
  );
}
