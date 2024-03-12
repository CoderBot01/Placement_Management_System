import Hero from "../components/HomeAll/Hero";
import Navbar from "../components/HomeAll/Navbar";
import NewsAnnouncement from "../components/HomeAll/NewsAnnouncement";
import PlacedStudents from "../components/HomeAll/PlacedStudents";
import Footer from "../components/HomeAll/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg="./assets/HomePet2.jpg"
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
