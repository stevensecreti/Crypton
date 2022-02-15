import React    from 'react';
import {WCard, WCMedia}      from 'wt-frontend';
import WCContent from 'wt-frontend/build/components/wcard/WCContent';
import globe    from '../images/globe.jpg'

const Welcome = (props) =>{
    return(
        <div>
            <div className='welcome-image'>
                <img src={globe} alt="Welcome Globe" className='welcome-image'></img>
            </div>
            <h1 className='welcome-text'>
                Welcome to the World Data Mapper!
            </h1>   
        </div>  
    );
}
export default Welcome;