import './App.css';
// import Header from './components/Header';
// import Promotion from './components/Promotion';
// import Footer from './components/Footer';
// import  Footer3  from './components/Footer3';
import './output.css';
import Admin from './pages/Admin/admin';
import CreateProfile from './pages/Customer/CreateProfile';
import Register from './pages/Customer/Register';
// import Pricing from './pages/Customer/Pricing';
// import AboutUs from './pages/Customer/AboutUs';
// import Banner from './pages/Customer/banner';
import Contact from './pages/Customer/contact';
// import Login from './pages/Customer/Login';
// import Example from './Example';
// import Error from "./pages/404/Error"


function App() {
  return (
    <div className="App">
        {/* <Banner /> */}
        {/* <Example /> */}
        {/* <Error /> */}
        {/* <Header /> */}
        {/* <Banner /> */}
        {/* <Promotion /> */}
        {/* <Footer /> */}
        {/* <Pricing /> */}
        <Contact />
        <Register />
        <CreateProfile />
        <Admin />
        {/* <AboutUs /> */}
        {/* <Footer3 /> */}
        {/* <Login /> */}
      
    </div>
  );
}

export default App;
