import Navbar from "../components/HomeAll/Navbar";
import Hero from "../components/HomeAll/Hero";
import Footer from "../components/HomeAll/Footer";
import Aboutus from "../components/HomeAll/Aboutus";

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
