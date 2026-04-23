import MainHero from '../components/MainHero';
import WhoAreWe from '../components/WhoAreWe';
import About from '../components/About';
import Categories from '../components/Categories';
import BeautyShowcase from '../components/BeautyShowcase';
import Testimonials from '../components/Testimonials';
import Events from '../components/Events';

const Home = () => {
  return (
    <div>
      <MainHero />
      <WhoAreWe />
      <BeautyShowcase />
      <About />
      <Testimonials />
      <Events />
    </div>
  );
};

export default Home;
