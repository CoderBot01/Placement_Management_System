import React from 'react';

class TrainingDevelopmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            programs: [
                { name: "Software Development Bootcamp", duration: "8 weeks" },
                { name: "Digital Marketing Certification", duration: "6 weeks" },
                { name: "Project Management Workshop", duration: "2 days" },
                // Add more programs as needed
            ]
        };
    }

    handleRegister = (programName) => {
        // You can customize this function to perform registration actions
        alert(`You have registered for ${programName}`);
    }

    render() {
        return (
            <div className="container">
                <h1>Placement Training and Development Programs</h1>
                <ul className="program-list">
                    {this.state.programs.map((program, index) => (
                        <li className="program-item" key={index}>
                            <div className="program-name">{program.name}</div>
                            <div className="program-duration">Duration: {program.duration}</div>
                            <button onClick={() => this.handleRegister(program.name)}>Register</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TrainingDevelopmentPage;
