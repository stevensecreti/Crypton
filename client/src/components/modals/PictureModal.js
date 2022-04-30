import React, { useState } 	from 'react';
import picture    from '../../assets/images/Picture2.png'
//import banner from '../images/151.png';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const PictureModal = (props) => {

    return(
        <>
        <WModal className="modal" cover={true} visible={true}>
        <WMHeader className="picture-header" onClose={() => props.setShowPicture()}>
				Profile Picture
			</WMHeader>
            <WMMain className="picture-main">

            <div>
                <img src={picture} alt="Picture" className='picture-image'></img>
            </div>

            <div id="picture-button">
                Change Profile Picture
            </div>
            </WMMain>
        </WModal>
        </>
    );
}
export default PictureModal;

//<Banner className='qrcode' value="http://facebook.github.io/react/" size={180}/>
//<a href="www.google.com" id="x"><img src="images/test.png" /></a>