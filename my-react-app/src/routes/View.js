import React from 'react';


class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            student: {
                name: "John Doe",
                photo: "https://via.placeholder.com/150", // Placeholder image URL
                department: "Computer Science",
                yearOfGraduation: 2023,
                skills: ["JavaScript", "React", "Node.js", "HTML", "CSS"],
                achievements: ["First place in Hackathon 2022", "Published an app on App Store"]
                // Add more details as needed
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
        const { name, photo, department, yearOfGraduation, skills, achievements } = student;
        
        return (
            <div className="container">
                <div className="profile-header">
                    <h1>{name}'s Profile</h1>
                    <img src={photo} alt="Student Photo" className="profile-photo" />
                </div>
                <div className="profile-details">
                    <h2>Details</h2>
                    {isEditMode ? (
                        <>
                            <p><strong>Name:</strong> <input type="text" name="name" value={name} onChange={this.handleChange} /></p>
                            <p><strong>Department:</strong> <input type="text" name="department" value={department} onChange={this.handleChange} /></p>
                            <p><strong>Year of Graduation:</strong> <input type="text" name="yearOfGraduation" value={yearOfGraduation} onChange={this.handleChange} /></p>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Department:</strong> {department}</p>
                            <p><strong>Year of Graduation:</strong> {yearOfGraduation}</p>
                        </>
                    )}
                </div>
                <div className="profile-skills">
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
                <div className="profile-achievements">
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
