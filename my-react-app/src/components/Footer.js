import "./footerstyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <h1>Placement Cell</h1>
        <p>Your future Journey Starts Here</p>
        <div>
          <a href="/">
            <i className="fa-brands fa-facebook-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-twitter-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-instagram-square"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h4>Projects</h4>
          <a href="/">Changelog</a>
          <a href="/">Status</a>
          <a href="/">License</a>
          <a href="/">All version</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="/">Issues</a>
          <a href="/">Github</a>
          <a href="/">Project</a>
          <a href="/">Twitter</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href="/">Support</a>
          <a href="/">Troubleshooting</a>
          <a href="/">Contact us</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
