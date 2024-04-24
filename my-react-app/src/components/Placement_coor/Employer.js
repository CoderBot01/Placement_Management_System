import React, { useState } from 'react';

function EmployerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyZip: '',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    companyDescription: '',
    companyLogo: '',
    companyBanner: '',
    companyIndustry: '',
    companySize: '',
    companyType: '',
    companyFounded: '',
    companySpecialties: '',
    companyBenefits: '',
    companyCulture: '',
    companyValues: '',
    companyMissionStatement: '',
    companyVisionStatement: '',
    companyGoals: '',
    companySocialMediaLinks: '',
    companyReferences: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form data
    // For example, you can make a POST request to your backend API to save the data
    console.log(formData);
    // Reset form data after submission
    setFormData({
      companyName: '',
      companyAddress: '',
      companyCity: '',
      companyState: '',
      companyZip: '',
      companyPhone: '',
      companyEmail: '',
      companyWebsite: '',
      companyDescription: '',
      companyLogo: '',
      companyBanner: '',
      companyIndustry: '',
      companySize: '',
      companyType: '',
      companyFounded: '',
      companySpecialties: '',
      companyBenefits: '',
      companyCulture: '',
      companyValues: '',
      companyMissionStatement: '',
      companyVisionStatement: '',
      companyGoals: '',
      companySocialMediaLinks: '',
      companyReferences: ''
    });
  };

  return (
    <div>
      <h2>Add Employer Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for employer information */}
        {/* Example: */}
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
        <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} placeholder="Company Address" />
        {/* Add other input fields for the rest of the data */}
        <input type="text" name="companyCity" value={formData.companyCity} onChange={handleChange} placeholder="Company City" />
        <input type="text" name="companyState" value={formData.companyState} onChange={handleChange} placeholder="Company State" />
        <input type="text" name="companyZip" value={formData.companyZip} onChange={handleChange} placeholder="Company Zip" />
        <input type="text" name="companyPhone" value={formData.companyPhone} onChange={handleChange} placeholder="Company Phone" />
        <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="Company Email" />
        <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="Company Website" />
        <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} placeholder="Company Description"></textarea>
        {/* Add other input fields similarly for the rest of the data */}
        <input type="text" name="companyLogo" value={formData.companyLogo} onChange={handleChange} placeholder="Company Logo" />
        <input type="text" name="companyBanner" value={formData.companyBanner} onChange={handleChange} placeholder="Company Banner" />
        <input type="text" name="companyIndustry" value={formData.companyIndustry} onChange={handleChange} placeholder="Company Industry" />
        <input type="text" name="companySize" value={formData.companySize} onChange={handleChange} placeholder="Company Size" />
        <input type="text" name="companyType" value={formData.companyType} onChange={handleChange} placeholder="Company Type" />
        <input type="date" name="companyFounded" value={formData.companyFounded} onChange={handleChange} placeholder="Company Founded" />
        <input type="text" name="companySpecialties" value={formData.companySpecialties} onChange={handleChange} placeholder="Company Specialties" />
        <input type="text" name="companyBenefits" value={formData.companyBenefits} onChange={handleChange} placeholder="Company Benefits" />
        <input type="text" name="companyCulture" value={formData.companyCulture} onChange={handleChange} placeholder="Company Culture" />
        <input type="text" name="companyValues" value={formData.companyValues} onChange={handleChange} placeholder="Company Values" />
        <input type="text" name="companyMissionStatement" value={formData.companyMissionStatement} onChange={handleChange} placeholder="Company Mission Statement" />
        <input type="text" name="companyVisionStatement" value={formData.companyVisionStatement} onChange={handleChange} placeholder="Company Vision Statement" />
        <input type="text" name="companyGoals" value={formData.companyGoals} onChange={handleChange} placeholder="Company Goals" />
        <input type="text" name="companySocialMediaLinks" value={formData.companySocialMediaLinks} onChange={handleChange} placeholder="Company Social Media Links" />
        <input type="text" name="companyReferences" value={formData.companyReferences} onChange={handleChange} placeholder="Company References" />

        {/* Add other input fields for the rest of the data */}
        <button type="submit">Submit</button>
      </form>
      {/* Display submitted employer information */}
      <div>
        <h2>Employer Information</h2>
        {/* Display the submitted data here */}
        {/* Example: */}
        <p>Company Name: {formData.companyName}</p>
        <p>Company Address: {formData.companyAddress}</p>
        {/* Add similar paragraphs for the rest of the data */}
        <p>Company Logo: {formData.companyLogo}</p>
        <p>Company Banner: {formData.companyBanner}</p>
        <p>Company Industry: {formData.companyIndustry}</p>
        <p>Company Size: {formData.companySize}</p>
        <p>Company Type: {formData.companyType}</p>
        <p>Company Founded: {formData.companyFounded}</p>
        <p>Company Specialties: {formData.companySpecialties}</p>
        <p>Company Benefits: {formData.companyBenefits}</p>
        <p>Company Culture: {formData.companyCulture}</p>
        <p>Company Values: {formData.companyValues}</p>
        <p>Company Mission Statement: {formData.companyMissionStatement}</p>
        <p>Company Vision Statement: {formData.companyVisionStatement}</p>
        <p>Company Goals: {formData.companyGoals}</p>
        <p>Company Social Media Links: {formData.companySocialMediaLinks}</p>
        <p>Company References: {formData.companyReferences}</p>

        {/* Add similar paragraphs for the rest of the data */}
      </div>
    </div>
  );
}

export default EmployerPage;
