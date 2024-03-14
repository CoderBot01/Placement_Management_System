import React, { useState, useRef } from 'react';
import './View.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const StudentProfile = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const profileRef = useRef(null);

    const toggleHandler = (index) => {
        setActiveSection(index === activeSection ? null : index);
    };

    const exportAsPDF = () => {
        const input = profileRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            const additionalData = [
                { label: 'Name', value: 'John Doe' },
                { label: 'Age', value: '24' },
                { label: 'Email', value: 'john.doe@example.com' },
                { label: 'Active Section', value: activeSection !== null ? activeSection.toString() : 'None' }
            ];

            additionalData.forEach(({ label, value }, index) => {
                pdf.text(`${label}: ${value}`, 10, imgHeight + 10 + (index * 10));
            });

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('student_profile.pdf');
        });
    };

    const renderSection = (title, index, content) => (
        <section key={index} className={`section ${index === activeSection ? 'active' : ''}`} onClick={() => toggleHandler(index)}>
            <h2>{title}</h2>
            <div className="section-content">
                {content}
            </div>
        </section>
    );

    const renderEditableInput = (label, defaultValue) => (
        <label>{label}<input type="text" defaultValue={defaultValue} /></label>
    );

    const renderEditableTextarea = (label, defaultValue) => (
        <label>{label}<textarea defaultValue={defaultValue} /></label>
    );

    const renderContent = () => {
        if (isEditing) {
            return (
                <>
                    {renderEditableInput('Full Name:', 'John Doe')}
                    {renderEditableInput('Date of Birth:', 'January 1, 2000')}
                    {/* Add other editable inputs */}
                </>
            );
        } else {
            return (
                <>
                    <p>Full Name: John Doe</p>
                    <p>Date of Birth: January 1, 2000</p>
                    {/* Add other non-editable data */}
                </>
            );
        }
    };

    return (
        <div ref={profileRef} className="student-profile">
            <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save Changes' : 'Edit'}</button>

            {renderSection('Personal Information', 0, renderContent())}
            {renderSection('Academic Achievements', 1, renderContent())}
            {/* Render other sections similarly */}

            <button onClick={exportAsPDF}>Export as PDF</button>
        </div>
    );
};

export default StudentProfile;
