import "../components/placedstudentstyles.css";
import PlacedData from "./PlacedData";

function PlacedStudents() {
  return (
    <div className="placed">
      <h1>Congratulations</h1>
      <p>Our Students placed on the Top companies</p>
      <div className="placedcard">
        {/* Pass the imported image */}
        <PlacedData
          image="./assets/student1.png"
          name="Student"
          department="B.Tech-IT"
          company="Company Name: TCS"
          salary="Salary: 6lpa"
        />
        <PlacedData
          image="./assets/student2.jpeg"
          name="Student"
          department="B.Tech-IT"
          company="Company Name: TCS"
          salary="Salary: 6lpa"
        />
        <PlacedData
          image="./assets/student3.png"
          name="Student"
          department="B.Tech-IT"
          company="Company Name: TCS"
          salary="Salary: 6lpa"
        />
          <PlacedData
          image="./assets/student3.png"
          name="Student"
          department="B.Tech-IT"
          company="Company Name: TCS"
          salary="Salary: 6lpa"
        />
      </div>
    </div>
  );
}

export default PlacedStudents;
