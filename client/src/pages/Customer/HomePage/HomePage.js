import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Banner from "../../../components/Banner";
import CarouselBar from "../../../components/Carousel";
import { useState } from 'react'

function HomePage() {
    const [user, setUser] = useState(false);
    return (
        <>
            <Header user={user}/>
            <Banner />
            <CarouselBar user={user} />
            <Footer />
        </>
    );
}

export default HomePage;