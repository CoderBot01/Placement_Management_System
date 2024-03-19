import React, { Component } from 'react';
import './Train.css';

class TrainingDevelopmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: []
        };
    }

    componentDidMount() {
        this.fetchTrainings();
    }

    fetchTrainings = async () => {
        try {
            const response = await fetch('http://localhost:3000/trainings');
            if (!response.ok) {
                throw new Error('Failed to fetch Trainings');
            }
            const data = await response.json();
            this.setState({ trainings: data });
        } catch (error) {
            console.error('Error fetching trainings:', error);
        }
    };

    applyForTraining = (id) => {
        const training = this.state.trainings.find(training => training.id === id);
        if (training) {
            alert("You have applied for the training for " + training.title);
        } else {
            console.error("Training not found");
        }
    };

    render() {
        return (
            <div className="container">
                <h1>Available Trainings</h1>
                <div className="tables-container">
                    {this.state.trainings.map((training, index) => (
                        <table key={index} className="training-table">
                            <thead>
                                <tr>
                                    <th colSpan="2">{training.title}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Duration:</strong></td>
                                    <td>{training.duration} Weeks</td>
                                </tr>
                                <tr>
                                    <td><strong>Description:</strong></td>
                                    <td>{training.description}</td>
                                </tr>
                                <tr>
                                    <td><strong>Fees:</strong></td>
                                    <td>{training.fees}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <button onClick={() => this.applyForTraining(training.id)}>Register</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        );
    }
}

export default TrainingDevelopmentPage;
