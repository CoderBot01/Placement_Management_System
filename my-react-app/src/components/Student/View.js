import React from 'react';
import "./View.css"

class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            student: {
                name: "John Doe",
                photo: "https://via.placeholder.com/150",
                department: "Computer Science",
                yearOfGraduation: 2023,
                skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
                achievements: ["First place in Hackathon 2022", "Published an app on App Store"],
                tenthSchool: "XYZ High School",
                tenthYearOfPassing: 2015,
                tenthPercentage: 85,
                twelfthSchool: "ABC Higher Secondary School",
                twelfthYearOfPassing: 2017,
                twelfthPercentage: 90,
                degree: "Bachelor of Technology",
                degreeSchool: "XYZ University",
                degreeYearOfPassing: 2021,
                degreePercentage: 80
            }
        };
    }

    handleEditClick = () => {
        this.setState({ isEditMode: true });
    }

    handleSaveClick = () => {
        // Perform save operation (e.g., send updated data to server)
        this.setState({ isEditMode: false });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            student: {
                ...prevState.student,
                [name]: value
            }
        }));
    }

    render() {
        const { isEditMode, student } = this.state;
        const { name, photo, department, yearOfGraduation, skills, achievements, tenthSchool, tenthYearOfPassing, tenthPercentage, twelfthSchool, twelfthYearOfPassing, twelfthPercentage, degree, degreeSchool, degreeYearOfPassing, degreePercentage } = student;

        return (
            <div>
                <div>
                    <h1>{name}'s Profile</h1>
                    <img src={photo} alt="Student Photo" style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} />
                </div>
                <div>
                    <h2>Details</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Department:</strong> {department}</p>
                    <p><strong>Year of Graduation:</strong> {yearOfGraduation}</p>
                    {isEditMode && (
                        <>
                            <p><strong>10th School:</strong> <input type="text" name="tenthSchool" value={tenthSchool} onChange={this.handleChange} /></p>
                            <p><strong>10th Year of Passing:</strong> <input type="text" name="tenthYearOfPassing" value={tenthYearOfPassing} onChange={this.handleChange} /></p>
                            <p><strong>10th Percentage:</strong> <input type="text" name="tenthPercentage" value={tenthPercentage} onChange={this.handleChange} /></p>
                            <p><strong>12th School:</strong> <input type="text" name="twelfthSchool" value={twelfthSchool} onChange={this.handleChange} /></p>
                            <p><strong>12th Year of Passing:</strong> <input type="text" name="twelfthYearOfPassing" value={twelfthYearOfPassing} onChange={this.handleChange} /></p>
                            <p><strong>12th Percentage:</strong> <input type="text" name="twelfthPercentage" value={twelfthPercentage} onChange={this.handleChange} /></p>
                            <p><strong>Degree:</strong> <input type="text" name="degree" value={degree} onChange={this.handleChange} /></p>
                            <p><strong>Degree School:</strong> <input type="text" name="degreeSchool" value={degreeSchool} onChange={this.handleChange} /></p>
                            <p><strong>Degree Year of Passing:</strong> <input type="text" name="degreeYearOfPassing" value={degreeYearOfPassing} onChange={this.handleChange} /></p>
                            <p><strong>Degree Percentage:</strong> <input type="text" name="degreePercentage" value={degreePercentage} onChange={this.handleChange} /></p>
                        </>
                    )}
                </div>
                <div>
                    <h2>Skills</h2>
                    {isEditMode ? (
                        <ul>
                            {skills.map((skill, index) => (
                                <li key={index}><input type="text" value={skill} onChange={this.handleChange} name={`skills[${index}]`} /></li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h2>Achievements</h2>
                    {isEditMode ? (
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}><input type="text" value={achievement} onChange={this.handleChange} name={`achievements[${index}]`} /></li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                            ))}
                        </ul>
                    )}
                </div>
                {isEditMode ? (
                    <button onClick={this.handleSaveClick}>Save</button>
                ) : (
                    <button onClick={this.handleEditClick}>Edit Profile</button>
                )}
            </div>
        );
    }
}

export default ViewProfilePage;
