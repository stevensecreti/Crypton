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
    //const currentTrend = trendData[trendData.length-1]-trendData[0];
    //const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    //const trendStyle = currentTrend >= 0 ? "account-trend-pos" : "account-trend-neg";
    //console.log(props.user)
    //var updateBannerCounter = 0;
    //const banner = props.user.banner;
    const banner = props.user.banner;
    const pfp = props.user.pfp;

    /*
    if(updateBannerCounter == 0)
    {
      console.log(updateBannerCounter)
      banner = props.banner;
    }
    else
    {
      console.log(updateBannerCounter)
      banner = props.user.banner;
    }
    */

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
      
      var loadBanner = function (event) {
        //console.log("LOAD BANNER FUNCTION CALLED");
        //console.log(event.target.files);
        var image = document.getElementById("banner-output");
        image.src = URL.createObjectURL(event.target.files[0]);
        //console.log("STRING: " + image.src);
        //banner = URL.createObjectURL(event.target.files[0]);
        //props.banner = image.src;

        //updateBannerCounter += 1;
        //console.log(updateBannerCounter)

        props.updateBanner(image.src);
        //goBack();

        //banner = "https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg";
      };

      //console.log(banner);

      var loadPfp = function (event) {
        //console.log("LOAD PROFILE FILE FUNCTION CALLED");
        //console.log(event.target.files[0])
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
        
        props.updatePfp(image.src);
      };

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
                                <input id="banner-file" type="file" onChange={loadBanner.bind(this)}/>
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
                                <input id="file" type="file" onChange={loadPfp.bind(this)}/>
                                <img src={pfp} id="output" width="200" />
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

//"https://static.vecteezy.com/system/resources/thumbnails/000/701/690/small/abstract-polygonal-banner-background.jpg"
//"https://images.squarespace-cdn.com/content/v1/5d8bded71a675f210c969aa5/1570063393205-X7CWFW08UJGTR4QZNVGC/squish+112.png"