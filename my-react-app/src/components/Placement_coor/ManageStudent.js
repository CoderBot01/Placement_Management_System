import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import BaseUrl from './Constant';
import { getData, postData, deleteData } from './functions';

function StudentManagement() {
    const [students, setStudents] = useState([]);
    const [student_id, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [cgpa, setCGPA] = useState('');
    const [dob, setDOB] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [searchedStudents, setSearchedStudents] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false); // State to control success message visibility

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await getData('/jobs');
            if (!response.ok) {
                throw new Error('Failed to fetch students. Server returned status: ' + response.status);
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
            setAlertMessage('Failed to fetch students. Please try again later.');
        }
    };

    const addStudent = async () => {
        const newStudent = { student_id, name, department, year, dob, cgpa  };

        try {
            const addResponse = await postData('/student', newStudent);
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

            setShowSuccess(true); // Show success message
            setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const searchByDepartments = async () => {
        try {
            const response = await getData('/student');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            const filteredStudents = data.filter(student => selectedDepartments.includes(student.department));
            setSearchedStudents(filteredStudents);
        } catch (error) {
            console.error('Error filtering students:', error);
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

    const handleDelete = async (student_id) => {
        try {
            const deleteResponse = await deleteData(`/student/${student_id}`);
            if (!deleteResponse.ok) {
                throw new Error('Failed to delete student');
            }
            setSearchedStudents(searchedStudents.filter(student => student.studentid !== student_id));
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    useEffect(() => {
        if (showSuccess) {
            setTimeout(() => {
                setShowSuccess(false);
                window.location.reload(); // Reload the page after 3 seconds
            }, 3000);
        }
    }, [showSuccess]);

    return (
        <div className="container mt-5">
            {showSuccess && (
                <div className="alert alert-success" role="alert">
                    Student added successfully!
                </div>
            )}
            <div className="row mb-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Add Student</h2>
                            <input type="text" className="form-control mb-3" placeholder="Student ID" value={student_id} onChange={e => setStudentId(e.target.value)} />
                            <input type="text" className="form-control mb-3" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            <select className="form-select mb-3" value={department} onChange={e => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="CSE">CSE</option>
                                <option value="Mech">Mechanical</option>
                                <option value="civil">Civil</option>
                                <option value="MDE">MDE</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                            </select>
                            <input type="text" className="form-control mb-3" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
                            <input type="text" className="form-control mb-3" placeholder="CGPA" value={cgpa} onChange={e => setCGPA(e.target.value)} />
                            <input type="date" className="form-control mb-3" placeholder="DOB" value={dob} onChange={e => setDOB(e.target.value)} />
                            <button className="btn btn-primary" onClick={addStudent}>Add Student</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Search Students by Department</h2>
                            <div className="mb-3">
                                <input type="checkbox" className="form-check-input" value="IT" onChange={handleDepartmentChange} /> IT
                                <input type="checkbox" className="form-check-input" value="MDE" onChange={handleDepartmentChange} /> MDE
                                <input type="checkbox" className="form-check-input" value="Mech" onChange={handleDepartmentChange} /> Mechanical
                                <input type="checkbox" className="form-check-input" value="civil" onChange={handleDepartmentChange} /> Civil
                                <input type="checkbox" className="form-check-input" value="CSE" onChange={handleDepartmentChange} /> CSE
                                <input type="checkbox" className="form-check-input" value="Cybersec" onChange={handleDepartmentChange} /> Cybersecurity
                                <input type="checkbox" className="form-check-input" value="UI" onChange={handleDepartmentChange} /> UI/UX
                                <input type="checkbox" className="form-check-input" value="Robotics" onChange={handleDepartmentChange} /> Robotics
                                <button className="btn btn-primary ms-3" onClick={searchByDepartments}>Search</button>
                            </div>
                            {searchedStudents.length > 0 ? (
                                <div>
                                    <h3 className="mb-3">Search Results</h3>
                                    <div className="mb-3">
                                        <button className="btn btn-primary me-2" onClick={exportToPDF}>Export to PDF</button>
                                        <button className="btn btn-primary" onClick={exportToExcel}>Export to Excel</button>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ color: 'black' }}>Student ID</th>
                                                <th style={{ color: 'black' }}>Name</th>
                                                <th style={{ color: 'black' }}>DOB</th>
                                                <th style={{ color: 'black' }}>Department</th>
                                                <th style={{ color: 'black' }}>Year</th>
                                                <th style={{ color: 'black' }}>GPA</th>
                                                <th style={{ color: 'black' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchedStudents.map((student) => (
                                                <tr key={student.student_id}>
                                                    <td>{student.student_id}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.dob}</td>
                                                    <td>{student.department}</td>
                                                    <td>{student.year}</td>
                                                    <td>{student.cgpa}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(student.student_id)}>Delete</button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentManagement;
