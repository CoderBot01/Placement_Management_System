import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Aboutus from "../components/Aboutus";

function about() {
  return (
    <>
      <Navbar />
      <Hero cName="hero-mid" heroImg="./assets/about1.jpg" title="ABOUT US" />
      <Aboutus />
      <Footer />
    </>
  );
}
export default about;
