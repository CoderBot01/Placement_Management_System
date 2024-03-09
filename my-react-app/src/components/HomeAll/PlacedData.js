import "./placedstudentstyles.css";

function PlacedData(props) {
  return (
    <div className="p-card">
      <div className="p-image">
        <img alt="image" src={props.image} />
      </div>
      <h4>{props.name}</h4>
      <p>{props.department}</p>
      <p>{props.company}</p>
      <p>{props.salary}</p>
    </div>
  );
}
export default PlacedData;
