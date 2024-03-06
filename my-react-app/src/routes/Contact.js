import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Contactform from "../components/Contactform";

function contact() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="./assets/contact1.jpg"
        title="Contact Us"
        text="Our goal is to help you realize your full potential. "
      />
      <Contactform />
      <Footer />
    </>
  );
}
export default contact;
