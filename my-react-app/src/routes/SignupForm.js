import React, { useState } from "react";
import "./SignupLogin.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignupForm = () => {
  // State variables to store form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  // Academic achievements state variables
  const [tenthGradeBoard, setTenthGradeBoard] = useState("");
  const [tenthGradePercentage, setTenthGradePercentage] = useState("");
  const [tenthGradeInstitution, setTenthGradeInstitution] = useState("");
  const [tenthGradeMajor, setTenthGradeMajor] = useState("");

  const [twelfthBoard, setTwelfthBoard] = useState("");
  const [twelfthPercentage, setTwelfthPercentage] = useState("");
  const [twelfthInstitution, setTwelfthInstitution] = useState("");
  const [twelfthMajor, setTwelfthMajor] = useState("");

  const [undergraduateDegreeDepartment, setUndergraduateDegreeDepartment] =
    useState("");
  const [undergraduateMajor, setUndergraduateMajor] = useState("");
  const [undergraduatePercentage, setUndergraduatePercentage] = useState("");
  const [undergraduateInstitution, setUndergraduateInstitution] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      country,
      address,
      tenthGradeBoard,
      tenthGradePercentage,
      tenthGradeInstitution,
      tenthGradeMajor,
      twelfthBoard,
      twelfthPercentage,
      twelfthInstitution,
      twelfthMajor,
      undergraduateDegreeDepartment,
      undergraduateMajor,
      undergraduatePercentage,
      undergraduateInstitution,
    });
  };

  return (
    <div className="signup-form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Fields */}

        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Country:</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select...</option>
            {/* Add country options as needed */}
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Academic Achievements Fields */}

        <div>
          <h3>Academic Achievements</h3>
          <div>
            <h4>10th Grade</h4>
            <div>
              <label>Board:</label>
              <input
                type="text"
                value={tenthGradeBoard}
                onChange={(e) => setTenthGradeBoard(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Percentage:</label>
              <input
                type="text"
                value={tenthGradePercentage}
                onChange={(e) => setTenthGradePercentage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Institution:</label>
              <input
                type="text"
                value={tenthGradeInstitution}
                onChange={(e) => setTenthGradeInstitution(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Academic Achievements</h3>
          <div>
            <h4>12th Grade</h4>
            <div>
              <label>Board:</label>
              <input
                type="text"
                value={twelfthBoard}
                onChange={(e) => setTwelfthBoard(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Percentage:</label>
              <input
                type="text"
                value={twelfthPercentage}
                onChange={(e) => setTwelfthPercentage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Institution:</label>
              <input
                type="text"
                value={twelfthInstitution}
                onChange={(e) => setTwelfthInstitution(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Major/Field of Study:</label>
              <input
                type="text"
                value={twelfthMajor}
                onChange={(e) => setTwelfthMajor(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3>Academic Achievements</h3>
          <div>
            <h4>Degree</h4>
            <div>
              <label>Board:</label>
              <input
                type="text"
                value={undergraduateDegreeDepartment}
                onChange={(e) =>
                  setUndergraduateDegreeDepartment(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label>Percentage:</label>
              <input
                type="text"
                value={undergraduatePercentage}
                onChange={(e) => setUndergraduatePercentage(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Institution:</label>
              <input
                type="text"
                value={undergraduateInstitution}
                onChange={(e) => setUndergraduateInstitution(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Major/Field of Study:</label>
              <input
                type="text"
                value={undergraduateMajor}
                onChange={(e) => setUndergraduateMajor(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Add fields for 12th/Diploma and Undergraduate similarly */}
        </div>

        <button type="submit">Submit</button>
      </form>
      <p>Already have an account? </p>
      <Link className="login-bottom" to="/login">
        Login Here
      </Link>
      <Navbar />
      <Footer />
    </div>
  );
};

export default SignupForm;
