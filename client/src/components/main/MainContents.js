import React            from 'react';
import { PromiseProvider } from 'mongoose';
import cryptonLogo         from '../images/CryptonLogo@2x.png'

const MainContents = (props) => {
    let selected = Object.keys(props.activeMap).length === 0 ? true:false;
    const maps = props.maps;
    return (
        <>
        </>
    );
};

export default MainContents;