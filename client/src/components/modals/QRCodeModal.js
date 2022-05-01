import React, { useState } 	from 'react';
import QRCode                          from 'qrcode.react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';
import Wallet from '../Wallet/Wallet'

const QRCodeModal = (code) => {
    console.log(code['QRCode'][0].show);
    return(
        <>
        <WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
        <WMHeader className="modal-header" onClose={code['QRCode'][0].show}>
				Account Number
			</WMHeader>
            <WMMain className="modal-main" justify-content="center">
                <div className="modal-algo">{code['QRCode'][0].account}</div>
                <div className="modal-spacer">&nbsp;</div>
                <div className="modal-algo">
                    <QRCode className='qrcode' value={code['QRCode'][0].account} size={180}/>
                </div>
            {/* <div id="qr-button">
            Send To Friend...
            </div> */}
            </WMMain>
        </WModal>
        </>
    );
}
export default QRCodeModal;