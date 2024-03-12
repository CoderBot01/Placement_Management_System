import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import "./mgstu.css"

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [cgpa, setCGPA] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchedStudents, setSearchedStudents] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');


    const addStudent = async () => {
        const newStudent = { studentId, name, department, year, cgpa };

        // Check if the studentId already exists
        const isExistingStudent = students.some(student => student.studentId === studentId);
        if (isExistingStudent) {
            setAlertMessage('Student with the same ID already exists!');
            return; // Exit function
        } else {
            setAlertMessage(''); // Clear any existing alert
        }

        try {
            // Make a POST request to add the new student
            const addResponse = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (!addResponse.ok) {
                throw new Error('Failed to add student');
            }

            // Assuming the response body contains the added student data
            const addedStudent = await addResponse.json();

            // Make a GET request to fetch the updated list of students
            const getResponse = await fetch('http://localhost:3000/students');
            if (!getResponse.ok) {
                throw new Error('Failed to fetch students');
            }

            const updatedStudents = await getResponse.json();

            // Update state with the updated list of students
            setStudents(updatedStudents);
            setSearchedStudents([...searchedStudents, addedStudent]); // Automatically add to displayed list
            // Clear input fields

        } catch (error) {
            console.error('Error adding student:', error);
            // Handle error
        }
    };


    const searchByDepartments = async () => {
        try {
            const response = await fetch('http://localhost:3000/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            
            // Filter the data based on selected departments
            const filteredStudents = data.filter(student => selectedDepartments.includes(student.department));
            setSearchedStudents(filteredStudents);
        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle error
        }
    };
    
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Search Results", 10, 10);
        let yPos = 20;
        searchedStudents.forEach((student, index) => {
            doc.text(`${index + 1}. ${student.name} - ${student.department}`, 10, yPos);
            yPos += 10;
        });
        doc.save("search_results.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(students);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'students.xlsx');
    };

    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        if (e.target.checked) {
            setSelectedDepartments([...selectedDepartments, department]);
        } else {
            setSelectedDepartments(selectedDepartments.filter(dep => dep !== department));
        }
    };

    const handleDelete = (index) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
    };

    return (
        <div>
            <h2 className='head'>Add Student</h2>
            <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="Mech">Mechanical</option>
                <option value="civil">Civil</option>
                <option value="MDE">MDE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>



            </select>
            <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            <input type="text" placeholder="CGPA" value={cgpa} onChange={(e) => setCGPA(e.target.value)} />
            <button onClick={addStudent}>Add Student</button>


            <h2 className='head'>Search Students by Department</h2>
            <div>
                <input type="checkbox" value="IT" onChange={(e) => handleDepartmentChange(e)} /> IT
                <input type="checkbox" value="MDE" onChange={(e) => handleDepartmentChange(e)} /> MDE
                <input type="checkbox" value="Mech" onChange={(e) => handleDepartmentChange(e)} /> Mechanical
                <input type="checkbox" value="Civil" onChange={(e) => handleDepartmentChange(e)} /> Civil
                <input type="checkbox" value="CSE" onChange={(e) => handleDepartmentChange(e)} /> CSE
                <input type="checkbox" value="Cybersec" onChange={(e) => handleDepartmentChange(e)} /> Cybersecurity
                <input type="checkbox" value="UI" onChange={(e) => handleDepartmentChange(e)} /> UI/UX
                <input type="checkbox" value="Robotics" onChange={(e) => handleDepartmentChange(e)} /> Robotics
            </div>
            <button onClick={searchByDepartments}>Search</button>

            {searchedStudents.length > 0 && (
                <div>
                    <h2 className='head'>Search Results</h2>
                    <button onClick={exportToPDF}>Export to PDF</button>
                    <button onClick={exportToExcel}>Export to Excel</button>
                    <table>
                        <thead>
                            <tr>
                                <th>studentId</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>GPA</th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>

                                    <td>{student.studentId}</td>
                                    <td>{student.name}</td>
                                    <td>{student.department}</td>
                                    <td>{student.year}</td>
                                    <td>{student.cgpa}</td>
                                    <td>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default StudentManagement;
