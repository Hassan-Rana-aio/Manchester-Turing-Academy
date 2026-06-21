import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AboutUs from "./AboutUs/AboutUs";
import OurAcademy from "./OurAcademy/OurAcademy";
import AdditionalOffers from "./AdditionalOffers/AdditionalOffers";
import OurPlatform from "./OurPlatform/OurPlatform";
import HowItWorks from "./HowItWorks/HowItWorks";
import AdminPanel from "./Admin/AdminPanel/AdminPanel";

const Home = () => {
  return (
    <div className="h-screen">
      <Header />
      <AboutUs />
      <AdditionalOffers />
      <OurAcademy />
      <OurPlatform />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
