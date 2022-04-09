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

const Account = (props) => {
    const balance = props.balance;
    const buyingPower = props.buyingPower;
    const trendData = props.balanceData;
    const accountHex = props.accountHex;
    //const currentTrend = trendData[trendData.length-1]-trendData[0];
    //const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    //const trendStyle = currentTrend >= 0 ? "account-trend-pos" : "account-trend-neg";

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

      var loadFile = function (event) {
        //var image = document.getElementById("output");
        //image.src = URL.createObjectURL(event.target.files[0]);
        var image = document.getElementById("output");
        //console.log(image);
        image.src = "https://media.istockphoto.com/photos/new-york-city-nyc-usa-picture-id615398376?k=20&m=615398376&s=612x612&w=0&h=5PVCORPJEjAxSy_Hei_hSK3OtNJMz8SHDicMN2R4X60=";
        //console.log(image);
      };

    return(
        <>
            <div id="account-container">
                <div className="account-header">
                    Account Settings
                </div>
                <div className="account-main">
                        <ul className='account-div'>

                            <div id="banner-button" onClick={toggleBanner}>
                                Banner
                            </div>

                            <div id="account-info" onClick={toggleChangeName}>
                                Display Name: {props.displayName}
                            </div>

                            <div id="account-info" onClick={toggleChangeEmail}>
                                Current Email: {props.userEmail}
                            </div>

                            <div id="account-info" onClick={toggleChangePassword}>
                                Current Password: ****
                            </div>

                            <div id="banner-button" onClick={togglePicture}>
                                Profile Picture
                            </div>

                            <div className="profile-pic">
                              <label className="-label" htmlFor="file">
                                <span className="glyphicon glyphicon-camera"></span>
                                <span>Change Image</span>
                              </label>
                              <input id="file" type="file" onChange={loadFile}/>
                              <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg" id="output" width="200" />
                            </div>

                        </ul>
                </div>
            </div>
        </>
    );
}
export default Account;

//https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg
//https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg
//https://media.istockphoto.com/photos/new-york-city-nyc-usa-picture-id615398376?k=20&m=615398376&s=612x612&w=0&h=5PVCORPJEjAxSy_Hei_hSK3OtNJMz8SHDicMN2R4X60=