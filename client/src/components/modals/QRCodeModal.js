import React, { useState } 	from 'react';
import QRCode                          from 'qrcode.react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import Wallet from '../Wallet/Wallet'

const QRCodeModal = (code) => {
    console.log(code['QRCode'][0].show);
    return(
        <>
        <WModal className="login-modal" cover={true} visible={true}>
        <WMHeader className="qr-header" onClose={code['QRCode'][0].show}>
				QRCode
			</WMHeader>
            <WMMain className="qr-main">
                <p text-align="center">{code['QRCode'][0].account}</p>
            <QRCode className='qrcode' value={code['QRCode'][0].account} size={180}/>
            {/* <div id="qr-button">
            Send To Friend...
            </div> */}
            </WMMain>
        </WModal>
        </>
    );
}
export default QRCodeModal;