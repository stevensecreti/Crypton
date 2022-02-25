import React                            from 'react';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
const Wallet = (props) => {
    return(
        <WLayout id="wallet-container">
            <WMHeader className="wallet-header">
                Wallet
            </WMHeader>
            <WMMain className="wallet-main">
                <WRow>
                    <WCol size="4" className="wallet-pannel">
                        Left
                    </WCol>
                    <WCol size="8" className="wallet-pannel">
                        Right
                    </WCol>
                </WRow>
            </WMMain>
        </WLayout>
    );
}
export default Wallet;