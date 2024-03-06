import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NewsAnnouncement from "../components/NewsAnnouncement";
import PlacedStudents from "../components/PlacedStudents";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="./assets/home1.jpg"
        title="Your future Journey Starts Here "
        text="Our goal is to help you realize your full potential. "
        buttonText="Get Started"
        url="/"
        btnClass="show"
      />
      <NewsAnnouncement />
      <PlacedStudents />
      <Footer />
    </>
  );
}
export default Home;
