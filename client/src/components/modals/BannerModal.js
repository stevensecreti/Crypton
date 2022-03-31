import React, { useState } 	from 'react';
import Banner                           from 'qrcode.react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const BannerModal = (props) => {

    return(
        <>
        <WModal className="login-modal" cover={true} visible={true}>
        <WMHeader className="banner-header" onClose={() => props.setShowBanner()}>
				Banner
			</WMHeader>
            <WMMain className="banner-main">
            <Banner className='banner' value="http://facebook.github.io/react/" size={180}/>
            <div id="banner-button">
            Send To Friend...
            </div>
            </WMMain>
        </WModal>
        </>
    );
}
export default BannerModal;