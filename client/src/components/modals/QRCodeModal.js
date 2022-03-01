import React, { useState } 	from 'react';
import QRCode                           from 'qrcode.react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const QRCodeModal = (props) => {

    return(
        <>
        <WModal className="login-modal" cover={true} visible={true}>
        <WMHeader className="qr-header" onClose={() => props.setShowQRCode()}>
				QRCode
			</WMHeader>
            <WMMain className="qr-main">
            <QRCode className='qrcode' value="http://facebook.github.io/react/" size={180}/>
            <div id="qr-button">
            Send To Friend...
            </div>
            </WMMain>
        </WModal>
        </>
    );
}
export default QRCodeModal;