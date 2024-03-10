import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    width: '100%',
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Student Information</Text>
        <Text style={styles.label}>Name: {data.name}</Text>
        <Text style={styles.label}>Age: {data.age}</Text>
        <Text style={styles.label}>Grade: {data.grade}</Text>
      </View>
    </Page>
  </Document>
);

const Resume = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Student Form</h1>
      <form>
        <div style={styles.section}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Grade:</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <PDFDownloadLink document={<MyDocument data={formData} />} fileName="student_information.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </form>
    </div>
  );
};

export default Resume;
