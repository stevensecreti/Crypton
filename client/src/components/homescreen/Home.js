import React, {useState} from 'react';
import Button from '@mui/material/Button';
import cryptonLogo    from '../images/CryptonLogo@2x.png'
import Carousel from 'react-img-carousel';

require('react-img-carousel/lib/carousel.css');

const Home = (props) => {
    return(
    <div className="screenContainer">
        <div className="screenHeader">
        <img src={cryptonLogo} alt="Crypton" className='homeImage'></img>
        <div className="homeImageText">RYPTON</div>
        </div>
        <div className="screenHeader">
            Welcome Back {props.userName}!
        </div>
        <div className="screenMain" id="homeScreenMain">
            <div className="homeText">
                Check out our Latest Games:
            </div>
            <div className="homeGamesCarousel">
                <Carousel viewportWidth="900px">
                    <img src={cryptonLogo}/>
                </Carousel>
            </div>
        </div>
    </div>
    );
}

export default Home;