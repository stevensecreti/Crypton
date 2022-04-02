import React, { useState }                            from 'react';
import { Chart as ChartJS, registerables } from "chart.js";
import {Line} from 'react-chartjs-2';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import QRCode from '../modals/QRCodeModal';

const Wallet = (props) => {
    const balance = props.balance;
    const buyingPower = props.buyingPower;
    const trendData = props.balanceData;
    const walletHex = props.walletHex;
    const currentTrend = trendData[trendData.length-1]-trendData[0];
    const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    const trendStyle = currentTrend >= 0 ? "wallet-trend-pos" : "wallet-trend-neg";

    ChartJS.register(...registerables);

    const state = {
        labels: ['January', 'February', 'March',
                 'April', 'May', 'June', 'July', 'August', 'Septmeber', 'October', 'November', 'December'],
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
            <div id="wallet-container">
                <div className="wallet-header">
                    Wallet
                </div>
                <div className="wallet-main">
                        <ul className='wallet-div'>
                            <div id="wallet-balance">
                                Balance: ${balance}
                            </div>
                            <div id="wallet-balance">
                                Buying Power: ${buyingPower}
                            </div>
                            <div id={trendStyle}>
                                {trend}
                            </div>
                            <div id="wallet-button" onClick={toggleQRCode}>
                                QRCode...
                            </div>
                            <div className='line-graph'>
                                <Line
                                data={state}
                                options={{
                                    title:{
                                    display:true,
                                    text:'Average Rainfall per month',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                />
                            </div>
                        </ul>
                </div>
            </div>
        </>
    );
}
export default Wallet;