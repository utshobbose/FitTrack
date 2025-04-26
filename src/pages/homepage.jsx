import Banner from '../components/banner';
import Homecard from '../components/homecard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Trackercard from '../components/trackercard';
// import FoodCalculator from '../components/foodcal';
// import VideoGrid from '../components/yogavideogrid';
// import Checkout from '../components/checkout';
// import GymMap from '../components/gymmap';
// import Burntcal from '../components/burntcal';
// import GymFinder from '../components/gymmap';
// import MeditationMusic from '../components/yogamusic';
// import DietChart from '../components/diet';
// import WorkoutRoutine from '../components/routine';
// import Blog from '../components/blog';

function HomePage() {
  const cardsData = [
    {
      title: "Manage your meals",
      image: "https://plus.unsplash.com/premium_photo-1664640733984-cbee33873783?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Master your nutrition with precise meal prep strategies. Track calories, macros, and portion sizes to fuel your body effectively and achieve your fitness goals.",
      link: "/dietchart"
    },
    {
      title: "Power Up Your Workout",
      image: "https://i0.wp.com/www.pictureperfectphoto.co.uk/wp-content/uploads/2023/03/Chris-Chapman_3719-1024x683.jpg?resize=1024%2C683&ssl=1",
      description: "Elevate your fitness routine with effective workout plans tailored to your goals. From strength training to cardio, explore routines that keep you motivated and build strength, endurance, and flexibility.",
      link: "/workoutroutine"
    },
    {
      title: "Yoga & Mindfulness",
      image: "https://agawojcik.com/wp-content/uploads/Aga-Wojcik-Photography_Yoga-01-rockless_web-1920px.jpg",
      description: "Reconnect with yourself through yoga and mindfulness practices. Improve your flexibility, focus, and inner peace with routines designed to reduce stress and enhance mental clarity.",
      link: "/yogamusic"
    },
  ];

  return (
    <div>
      <Navbar />
      <Banner />
      
      
      
      {/* Container for the Homecards */}
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {/* Map through the data and create a Homecard for each */}
        {cardsData.map((card, index) => (
          <Homecard 
            key={index} 
            title={card.title} 
            image={card.image} 
            description={card.description} 
            link = {card.link}
          />
        ))}
      </div>
      
      <Trackercard />
      <Footer />
      
      
      
    </div>
  );
}

export default HomePage;
