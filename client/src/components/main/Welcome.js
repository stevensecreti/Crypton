import React    from 'react';
import cryptonLogo    from '../images/CryptonLogo@2x.png'

const Welcome = (props) =>{
    return(
        <div>
            <div className='welcome-image'>
                <img src={cryptonLogo} alt="Crypton" className='welcome-image'></img>
            </div>
            <h1 className='welcome-text'>
                Welcome to Crypton!
            </h1>   
        </div>  
    );
}
export default Welcome;