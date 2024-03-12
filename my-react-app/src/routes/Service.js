import Navbar from "../components/HomeAll/Navbar";
import Hero from "../components/HomeAll/Hero";
import Footer from "../components/HomeAll/Footer";

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
       
      />

      <Footer />
    </>
  );
}
export default Service;
