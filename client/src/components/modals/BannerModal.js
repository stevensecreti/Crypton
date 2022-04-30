import React, { useState } 	from 'react';
import banner    from '../../assets/images/Banner2.png'
//import banner from '../images/151.png';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const BannerModal = (props) => {

    return(
        <>
        <WModal className="modal" cover={true} visible={true}>
        <WMHeader className="banner-header" onClose={() => props.setShowBanner()}>
				Banner
			</WMHeader>
            <WMMain className="banner-main">

            <div>
                <img src={banner} alt="Banner" className='banner-image'></img>
            </div>

            <div id="banner-button">
            Change Banner
            </div>
            </WMMain>
        </WModal>
        </>
    );
}
export default BannerModal;

//<img src={banner} alt="Banner" className='banner-image'></img>
//<Banner className='qrcode' value="http://facebook.github.io/react/" size={180}/>
//<a href="www.google.com" id="x"><img src="images/test.png" /></a>