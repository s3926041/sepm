import React from 'react';
import { Carousel } from 'antd';
import "./PromotionLog.css"
import Login from '../pages/Customer/Login';
const contentStyle = {
    margin: 0,
    height: '560px',
    color: '#fff',
    lineHeight: '560px',
    textAlign: 'center',
    background: '#364d79',
};
const circle = {
width: "350px",
height: "450px",
position: "absolute",
opacity: "0.5",
top: "10.2rem",
right: "4rem",
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
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>

           
        </Carousel>
        <div style={circle} className='log'>
                <Login/>
        </div>
        </div>
        
    );
};
export default Promotion;