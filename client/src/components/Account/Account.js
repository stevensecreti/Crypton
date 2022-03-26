import React, { useState }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import {Line} from 'react-chartjs-2';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import QRCode from '../modals/QRCodeModal';

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

      const toggleQRCode = () => {
        props.setShowQRCode();
      }

    return(
        <>
            <div id="account-container">
                <div className="account-header">
                    Account Settings
                </div>
                <div className="account-main">
                        <ul className='account-div'>
                            <div id="account-balance">
                                Display Name: test{balance}
                            </div>
                            <div id="account-balance">
                                Current Email: test{buyingPower}
                            </div>
                            <div id="account-balance">
                                Current Password: test{buyingPower}
                            </div>
                            
                            <div id="account-button" onClick={toggleQRCode}>
                                Banner
                            </div>
                        </ul>
                </div>
            </div>
        </>
    );
}
export default Account;