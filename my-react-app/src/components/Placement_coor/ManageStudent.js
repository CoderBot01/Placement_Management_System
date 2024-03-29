import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './mgstu.css';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [cgpa, setCGPA] = useState('');
    const [dob, setDOB] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchedStudents, setSearchedStudents] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle error
        }
    };

    const addStudent = async () => {
        const newStudent = { studentId, name, department, year, dob, cgpa };

        try {
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

            fetchStudents();

            setStudentId('');
            setName('');
            setDepartment('');
            setYear('');
            setCGPA('');
            setDOB('');
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
            const filteredStudents = data.filter(student => selectedDepartments.includes(student.department));
            setSearchedStudents(filteredStudents);
        } catch (error) {
            console.error('Error filtering students:', error);
            // Handle error
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Search Results', 10, 10);
        let yPos = 20;
        searchedStudents.forEach((student, index) => {
            doc.text(`${index + 1}. ${student.name} - ${student.department}`, 10, yPos);
            yPos += 10;
        });
        doc.save('search_results.pdf');
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(searchedStudents);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'students.xlsx');
    };

    const handleDepartmentChange = e => {
        const department = e.target.value;
        if (e.target.checked) {
            setSelectedDepartments([...selectedDepartments, department]);
        } else {
            setSelectedDepartments(selectedDepartments.filter(dep => dep !== department));
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const deleteResponse = await fetch(`http://localhost:3000/students/${studentId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error('Failed to delete student');
            }

            // Filter out the deleted student from searchedStudents
            setSearchedStudents(searchedStudents.filter(student => student.studentid !== studentId));

            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2 className="head">Add Student</h2>
            <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <select value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="CSE">CSE</option>
                <option value="Mech">Mechanical</option>
                <option value="civil">Civil</option>
                <option value="MDE">MDE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
            </select>
            <input type="text" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
            <input type="text" placeholder="CGPA" value={cgpa} onChange={e => setCGPA(e.target.value)} />
            <input type="text" placeholder="DOB" value={dob} onChange={e => setDOB(e.target.value)} />

            <button onClick={addStudent}>Add Student</button>

            <h2 className="head">Search Students by Department</h2>
            <div>
                <input type="checkbox" value="IT" onChange={handleDepartmentChange} /> IT
                <input type="checkbox" value="MDE" onChange={handleDepartmentChange} /> MDE
                <input type="checkbox" value="Mech" onChange={handleDepartmentChange} /> Mechanical
                <input type="checkbox" value="civil" onChange={handleDepartmentChange} /> Civil
                <input type="checkbox" value="CSE" onChange={handleDepartmentChange} /> CSE
                <input type="checkbox" value="Cybersec" onChange={handleDepartmentChange} /> Cybersecurity
                <input type="checkbox" value="UI" onChange={handleDepartmentChange} /> UI/UX
                <input type="checkbox" value="Robotics" onChange={handleDepartmentChange} /> Robotics
            </div>
            <button onClick={searchByDepartments}>Search</button>

            {searchedStudents.length > 0 ? (
                <div>
                    <h2 className="head">Search Results</h2>
                    <button onClick={exportToPDF}>Export to PDF</button>
                    <button onClick={exportToExcel}>Export to Excel</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>GPA</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedStudents.map((student) => (
                                <tr key={student.studentid}>
                                    <td>{student.studentid}</td>
                                    <td>{student.name}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.department}</td>
                                    <td>{student.year}</td>
                                    <td>{student.cgpa}</td>
                                    <td>
                                        <button onClick={() => handleDelete(student.studentid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}

export default StudentManagement;
