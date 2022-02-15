import React from 'react';

const Logo = (props) => {
    const handleSetActive = () =>{
        props.closeActiveMap();
    }

    return (
        <div className='logo' onClick = {handleSetActive}>
            CRYPTON
        </div>
    );
};

export default Logo;