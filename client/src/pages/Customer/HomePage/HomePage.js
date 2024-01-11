import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Banner from "../../../components/Banner";
import CarouselBar from "../../../components/Carousel";
import { useState } from 'react'
import CheckLogin from "../../../components/CheckLogin";


function HomePage() {
    const [user, setUser] = useState(false);
    return (
        <div style={{height: "100%"}}>
            <CheckLogin />
            {/* <Header user={user}/> */}
            <Banner />
            <CarouselBar user={user} />
            {/* <Footer /> */}
        </div>
    );
}

export default HomePage;