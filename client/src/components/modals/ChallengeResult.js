import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const ChallengeResult = (props) => {
    const win = props.win;
    return(
        <>
        <WModal className="modal" cover={true} visible={true} animation="slide-fade-left">
        <WMHeader className="modal-header" onClose={() => props.toggleShowResult(false)}>
				Challenge Result
			</WMHeader>
            <WMMain className="modal-main" justify-content="center">
                <div className="modal-spacer">&nbsp;</div>
                {
                    win == true ?
                    <div className="modal-algo">
                        You Won!
                    </div>
                    :
                    <div className="modal-algo">
                        You Lost :(
                    </div>
                }
                
            </WMMain>
        </WModal>
        </>
    );
}
export default ChallengeResult;