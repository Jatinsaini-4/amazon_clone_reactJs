import React from 'react'
import './Carousel.css';
import Carousel from 'react-bootstrap/Carousel';

function CarouselBlock() {
    return (
        <div className="carousel">
            <Carousel slide={false} variant={"dark"} indicators={false} nextLabel={''} prevLabel={''} prevIcon={<span aria-hidden='true' className='carousel-control-prev-icon'/> } nextIcon={<span aria-hidden='true' className='carousel-control-next-icon'/>} interval={2000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Jan/unrecatf/icici/PC-2_less._CB583013789_.jpg"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Baby/cnnjpp1/Baby/D92807365-_1_Tallhero_2xx._CB598669664_.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200._CB574597993_.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/shoes/2024/MFD/Jan/Unrec/Sports/3000._CB583024006_.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselBlock