import Navbar from "../components/HomeAll/Navbar";
import Hero from "../components/HomeAll/Hero";
import Footer from "../components/HomeAll/Footer";
import Contactform from "../components/HomeAll/Contactform";

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
