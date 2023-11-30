
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// // import Container from 'react-bootstrap/Container';

// import React from 'react';
// import { Col, Row } from 'antd';
// const style = {
//     background: '#0092ff',
//     padding: '8px 0',
// };



// export const Footer3 = () => {
//     return (
//         <div className='bg-light'>
//             {/* <Container className='mt-5'>
//                 <Row className='d-flex justify-content-between'>
//                     <Col md={5}>
//                         <div className='d-flex mt-5'>
//                             <h4>Subscribe Newsletter</h4>
//                             <p>Subscribe newsletter to get 5% on all products.</p>
//                         </div>

//                     </Col>

//                     <Col md={5}>
//                         <div className='d-flex mt-5'>
//                             <input className='p-3 border-0' placeholder='Enter Your Email'></input>
//                             <button className='p-3 mx-3 bg-danger border-0 text-center text-white'>Subcribe</button>
//                         </div>
//                     </Col>
//                 </Row>

//             </Container> */}
//             {/* <Container className=" bg-sky pt-3" >
//                 <div className="text-md-start mt-2">
//                     <Row className="mt-3" style={{ backgroundColor: "#e6e9eb" }}>
//                         <Col sm={12} md={6} className="mx-auto mb-4 mt-2" >
//                             <h5 className="text-uppercase fw-bold mb-4 ">
//                                 Contact Us
//                             </h5>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Hotline & Online chat {"(24/7)"}</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Help Center</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>How To Buy</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Shipping and Delivery</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>International Product Policy</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>How To Return</a></p>
//                         </Col>

//                         <Col sm={12} md={6} className="mx-auto mb-4 mt-2">
//                             <h5 className="text-uppercase fw-bold mb-4">LAZADA VIETNAM</h5>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>All Categories</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>About Lazada</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Sell on Lazada</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Afﬁliate Program</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Careers</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Terms & Conditions"}</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Privacy Policy</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Press & Media"}</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Intellectual Property Protection</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Operating Regulation</a></p>
//                             <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Procedure of claim and dispute handling"}</a></p>
//                         </Col>

//                     </Row>
//                 </div>

                
//             </Container> */}
//             {/* <Row
//                 gutter={{
//                     xs: 8,
//                     sm: 16,
//                     md: 24,
//                     lg: 32,
//                 }}
//                 className=''
//             >
//                 <Col className="gutter-row" xs={{
//                     span: 8,
//                     offset: 1,
//                 }}
//                     lg={{
//                         span: 8,
//                         offset: 2,
//                     }}>
//                     <h5 className="text-uppercase fw-bold mb-4 ">
//                         Contact Us
//                     </h5>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Hotline & Online chat {"(24/7)"}</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Help Center</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>How To Buy</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Shipping and Delivery</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>International Product Policy</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>How To Return</a></p>
//                 </Col>
//                 <Col className="gutter-row" xs={{
//                     span: 8,
//                     offset: 2,
//                 }}
//                     lg={{
//                         span: 8,
//                         offset: 2,
//                     }}>
//                     <h5 className="text-uppercase fw-bold mb-4">LAZADA VIETNAM</h5>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>All Categories</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>About Lazada</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Sell on Lazada</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Afﬁliate Program</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Careers</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Terms & Conditions"}</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Privacy Policy</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Press & Media"}</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Intellectual Property Protection</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>Operating Regulation</a></p>
//                     <p><a to="/" className="text-reset" style={{ textDecoration: "none" }}>{"Procedure of claim and dispute handling"}</a></p>
//                 </Col>
               
                
                
//             </Row> */}
            

            
//         </div>
//     )
// }

// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// export default function Footer3() {
//     return (
//         <Container fluid className="bg-gray-800 text-white py-5">
//             <Row>
//                 <Col md={6}>
//                     <h5 className="mb-3">About Us</h5>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//                 </Col>
//                 <Col md={6}>
//                     <h5 className="mb-3">Contact Us</h5>
//                     <ul className="list-unstyled">
//                         <li><a href="#" className="text-white">info@example.com</a></li>
//                         <li><a href="#" className="text-white">(123) 456-7890</a></li>
//                         <li><a href="#" className="text-white">123 Main Street, Anytown, CA 12345</a></li>
//                     </ul>
//                 </Col>
//             </Row>
//             <Row className="text-center">
//                 <Col xs={12}>
//                     <p className="mb-0">&copy; 2023 Your Company Name</p>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// import React from 'react';
// import "../output.css";

// const Footer3 = () => {
//     return (
//         <div className="flex flex-row justify-around bg-gray-900 w-full h-24 md:flex-col md:items-center md:justify-between md:h-16 text-white py-4 md:py-0">
//             <div className="flex flex-col md:w-1/2 ">
//                 <h5 className="mb-2 md:mb-0">About Us</h5>
//                 <p className="md:ml-4 text-sm md:text-base">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//             </div>
//             <div className="flex flex-col basis-1/3 hover:basis-1/2 md:w-1/2 ">
//                 <h5 className="mb-2 md:mb-0">Contact Us</h5>
//                 <ul className="md:ml-4 list-none md:flex flex-col md:text-sm">
//                     <li>
//                         <a href="#" className="text-white underline hover:text-gray-400">info@example.com</a>
//                     </li>
//                     <li>
//                         <a href="#" className="text-white underline hover:text-gray-400">(123) 456-7890</a>
//                     </li>
//                     <li>
//                         <a href="#" className="text-white underline hover:text-gray-400">123 Main Street, Anytown, CA 12345</a>
//                     </li>
//                 </ul>
//             </div>
//             <div className="flex flex-col justify-center md:w-full md:text-center">
//                 <p className="ml-2 text-xs">&copy; 2023 Your Company Name</p>
//             </div>
//         </div>
//     );
// };

// export default Footer3;

import React from 'react';
import {  Col, Row, Typography } from 'antd';

const Footer = () => {
    return (
        <div className="bg-grey  py-5">
            <Row justifyContent="space-between">
                <Col lg={12} md={24} sm={12}>
                    <Typography.Title level={4}>About Us</Typography.Title>
                    <Typography.Paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography.Paragraph>
                </Col>
                <Col lg={12} md={24} sm={12}>
                    <Typography.Title level={4}>Contact Us</Typography.Title>
                    <ul>
                        <li>
                            <a target="_blank" href="mailto:info@example.com">info@example.com</a>
                        </li>
                        <li>
                            <a target="_blank" href="tel:+1234567890">(123) 456-7890</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.example.com/address">123 Main Street, Anytown, CA 12345</a>
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row justifyContent="center">
                <Col lg={12} md={12} sm={12}>
                    <Typography.Paragraph color="gray">© 2023 Your Company Name</Typography.Paragraph>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;