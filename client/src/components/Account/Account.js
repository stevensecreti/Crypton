import React, { useState }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import {Line} from 'react-chartjs-2';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import QRCode from '../modals/QRCodeModal';
import Banner from '../modals/BannerModal';
import { getTableContainerUtilityClass } from '@mui/material';

const Account = (props) => {
    const balance = props.balance;
    const buyingPower = props.buyingPower;
    const trendData = props.balanceData;
    const accountHex = props.accountHex;
    const banner = props.user.banner;
    const pfp = props.user.pfp;

    ChartJS.register(...registerables);

    const state = {
        datasets: [
          {
            label: 'Balance',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#013292',
            borderColor: '#013292',
            borderWidth: 2,
            data: trendData
          }
        ]
      }

      const toggleBanner = () => {
        props.setShowBanner();
      }

      const togglePicture = () => {
        props.setShowPicture();
      }

      const toggleChangeName = () => {
        props.setShowChangeName();
      }

      const toggleChangeEmail = () => {
        props.setShowChangeEmail();
      }

      const toggleChangePassword = () => {
        props.setShowChangePassword();
      }
      
      const uploadBanner = async event => {
        const file = event.target.files[0];
        if(!file) return; 
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', "s41zgvdq");

        const res = await fetch('https://api.cloudinary.com/v1_1/dmhtustnr/image/upload', 
        {
          method: 'POST',
          body: data
        });
        const img = await res.json();
        props.updateBanner(img.secure_url);
      }

      const uploadPFP = async event =>{
        const file = event.target.files[0];
        if(!file){ return;}
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', "s41zgvdq");

        const res = await fetch('https://api.cloudinary.com/v1_1/dmhtustnr/image/upload', 
        {
          method: "POST",
          body: data,
        });
        const img = await res.json();
        props.updatePfp(img.secure_url);
      }


    return(
        <>
            <div id="account-container">
                <div className="account-header">
                    Account Settings
                </div>
                <div className="account-main">
                        <ul className='account-div'>

                            <div className="banner-pic">
                              <label className="banner-label" htmlFor="banner-file">
                                <span className="glyphicon glyphicon-camera"></span>
                                <span>Change Banner</span>
                              </label>
                                <input id="banner-file" type="file" onChange={uploadBanner}/>
                                <img src={banner} id="banner-output" width="500" />
                            </div>

                            <div className="modal-spacer">&nbsp;</div>

                            <div id="account-info" onClick={toggleChangeName}>
                                Display Name: {props.displayName}
                            </div>

                            <div id="account-info" onClick={toggleChangeEmail}>
                                Current Email: {props.userEmail}
                            </div>

                            <div id="account-info" onClick={toggleChangePassword}>
                                Current Password: ****
                            </div>

                            <div className="modal-spacer">&nbsp;</div>
                            <div className="modal-spacer">&nbsp;</div>
                            <div className="modal-spacer">&nbsp;</div>
                            <div className="modal-spacer">&nbsp;</div>
                            <div className="modal-spacer">&nbsp;</div>

                            <div className="profile-pic">
                              <label className="-label" htmlFor="file">
                                <span className="glyphicon glyphicon-camera"></span>
                                <span>Change Profile Picture</span>
                              </label>
                                <input id="file" type="file" accept="image/*" onChange={uploadPFP}/>
                                <img src={pfp} id="output" width="200" />
                            </div>

                        </ul>
                </div>
            </div>
        </>
    );
}
export default Account;