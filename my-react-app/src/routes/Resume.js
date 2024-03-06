import React, { useState } from 'react';

function ResumeForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
        experience: '',
        education: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send the data to a server
        console.log(formData);
    }

    return (
        <div className="container">
            <h1>Resume Builder</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary:</label>
                    <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Experience:</label>
                    <textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="education">Education:</label>
                    <textarea id="education" name="education" value={formData.education} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ResumeForm;
