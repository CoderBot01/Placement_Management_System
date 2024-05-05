import React from 'react';
import { Bar } from 'react-chartjs-2';
import "./Progress1.css"
class ProgressPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData: {
                labels: ['Attended', 'Passed'], 
                datasets: [
                    {
                        label: 'Students',
                        backgroundColor: ['rgba(75,192,192,1)', 'rgba(54, 162, 235, 1)'],
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1,
                        data: [50, 30] 
                    }
                ]
            },
            companyPlacementData: {
                labels: ['Company A', 'Company B', 'Company C', 'Company D'],
                datasets: [
                    {
                        label: 'Students Placed',
                        backgroundColor: 'rgba(75, 192, 192, 1)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                        data: [20, 15, 25, 10] 
                    }
                ]
            }
        };
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Interview Progress</h1>
                    <Bar
                        data={this.state.progressData}
                        options={{
                            scales: {
                                xAxes: [{
                                    type: 'category',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Status'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Number of Students'
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Interview Progress',
                                fontSize: 20
                            },
                            legend: {
                                display: false
                            }
                        }}
                    />
                </div>

                <div className="container">
                    <h1>Company Placement Progress</h1>
                    <Bar
                        data={this.state.companyPlacementData}
                        options={{
                            scales: {
                                xAxes: [{
                                    type: 'category',
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Company'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Number of Students Placed'
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                text: 'Company Placement Progress',
                                fontSize: 20
                            },
                            legend: {
                                display: false
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ProgressPage;