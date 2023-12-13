import React from 'react';
import { Carousel } from 'antd';
import "./PromotionLog.css"
import Login from '../pages/Customer/Login';
import gamer from "../Assest/gamer1.png";
import gamer1 from "../Assest/1.png";
import gamer2 from "../Assest/3.png";
import gamer3 from "../Assest/4.png";
const contentStyle = {
    margin: 0,
    width:"100%",
    height: '560px',
    color: '#fff',
    lineHeight: '560px',
    textAlign: 'center',
    background: '#364d79',
    objectFit: "cover",
};

const circle = {
width: "550px",
height: "450px",
position: "absolute",
opacity: "0.8",
top: "10.2rem",
right: "calc(50% - 275px)",
background: "#ffff",
   
}

const style = {
    '@media (max-width: 100px)': {
        display: 'none',
    },
}
const Promotion = () => {
    // const onChange = (currentSlide) => {
    //     console.log(currentSlide);
    // };
    return (
        <div style={{width: "100%", height:"560px"}}>
        <Carousel  autoplay>
            <div>
                <img alt="gamer1" src={gamer} style={contentStyle} />
            </div>
            <div>
                    <img alt="gamer1" src={gamer1} style={contentStyle} />
            </div>
            <div>
                    <img alt="gamer1" src={gamer2} style={contentStyle} />
            </div>
            <div>
                    <img alt="gamer1" src={gamer3} style={contentStyle} />
            </div>

           
        </Carousel>
        <div style={circle} className='log'>
                <Login/>
        </div>
        </div>
        
    );
};
export default Promotion;