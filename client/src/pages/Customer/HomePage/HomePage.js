import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Banner from "../../../components/Banner";
import CarouselBar from "../../../components/Carousel";
import { useState } from 'react'
import CheckLogin from "../../../components/CheckLogin";


function HomePage() {
    const [user, setUser] = useState(false);
    return (
        <>
            <CheckLogin />
            <Header user={user}/>
            <Banner />
            <CarouselBar user={user} />
            <Footer />
        </>
    );
}

export default HomePage;