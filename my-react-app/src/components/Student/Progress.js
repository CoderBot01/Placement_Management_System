import React from 'react';
import { Bar } from 'react-chartjs-2';
import "./Progress.css"

class ProgressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData: {
                labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
                datasets: [
                    {
                        label: 'Progress',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: [80, 50, 70, 90] // Example data (progress percentages)
                    }
                ]
            }
        };
    }

    render() {
        return (
            <div className="container">
                <h1>Progress</h1>
                <Bar
                    data={this.state.progressData}
                    options={{
                        title: {
                            display: true,
                            text: 'Task Progress',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}

export default ProgressPage;
