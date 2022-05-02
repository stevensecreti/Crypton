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
    const email = props.user.email; //CURRENT EMAIL
    //console.log(email) //CURRENT EMAIL

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
        console.log("toggleChangeEmail")
        props.setShowChangeEmail();
        //props.updateEmail();
        //props.updateEmail("test7")
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
      <div className="screenContainer">
        <div className="screenHeader">
            Account Settings
        </div>
        <div className="screenMain" id="accountMain">
          <div className="banner-pic">
            <label className="banner-label" htmlFor="banner-file">
              <span className="glyphicon glyphicon-camera"></span>
              <span>Change Banner</span>
            </label>
            <input id="banner-file" type="file" onChange={uploadBanner}/>
            <img src={banner} id="banner-output" width="500" />
          </div>
          <div className="accountInfoButtons">
            <div className="accountInfoRow">
              <div className="profile-pic">
                <label className="-label" htmlFor="file">
                  <span className="glyphicon glyphicon-camera"></span>
                  <span>Change Profile Picture</span>
                </label>
                <input id="file" type="file" accept="image/*" onChange={uploadPFP}/>
                <img src={pfp} id="output" width="200" />
              </div>  
              <div className="accountInfo" id="displayName" onClick={toggleChangeName}>
                Username: {props.displayName}
              </div>
            </div>
            <div className="accountInfo" onClick={toggleChangeEmail}>
                Email: {props.userEmail}
            </div>
            <div className="accountInfo" onClick={toggleChangePassword}>
                Password: ****
            </div>
          </div>
          
          
            
        </div>
      </div>
     
    );
}
export default Account;

//props.updateEmail("test7")