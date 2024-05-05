import React, { Component } from 'react';
import './Train.css';
import { getData, postData, deleteData } from './functions';

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
            const response = await getData('/trainings');
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
                <h1 className="mt-4 mb-4 text-black">Available Trainings</h1>
                <div className="table-responsive">
                    {this.state.trainings.map((training, index) => (
                        <table key={index} className="table table-striped table-bordered">
                            <thead className="thead-dark">
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
                                        <button className="btn btn-primary" onClick={() => this.applyForTraining(training.id)}>Register</button>
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
