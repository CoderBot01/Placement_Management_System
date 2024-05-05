import "./Contactformstyles.css";

function Contactform() {
  return (
    <div className="form-container">
      <h1>Send a message to us</h1>
      <form>
        <input placeholder="Name" />
        <input placeholder="Emaill" />
        <input placeholder="Subject" />
        <textarea placeholder="Message" rows="5"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Contactform;
