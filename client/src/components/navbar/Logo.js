import React from 'react';

const Logo = (props) => {
    const handleSetActive = () =>{
        props.closeActiveMap();
    }

    return (
        <div className='logo' onClick = {handleSetActive}>
            The World Data Mapper
        </div>
    );
};

export default Logo;