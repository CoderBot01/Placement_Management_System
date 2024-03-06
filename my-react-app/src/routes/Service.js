import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Service() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="./assets/service.jpg"
        title="Service"
        text="Our goal is to help you realize your full potential. "
        buttonText="Get Started"
        url="/"
        btnClass="show"
      />

      <Footer />
    </>
  );
}
export default Service;
