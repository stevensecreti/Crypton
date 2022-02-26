import React                            from 'react';
import QRCode                           from 'qrcode.react';
import { Chart as ChartJS, registerables } from "chart.js";
import {Line} from 'react-chartjs-2';
import WMHeader from 'wt-frontend/build/components/wmodal/WMHeader';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import WLayout from 'wt-frontend/build/components/wlayout/WLayout';
import WCol from 'wt-frontend/build/components/wgrid/WCol';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const Wallet = (props) => {
    const balance = 0;
    const buyingPower = 0;
    const currentTrend = 0;
    const trend = "Current Trend: " + (currentTrend >= 0 ? "+"+currentTrend+"%" : "-"+(-currentTrend)+"%");
    const trendStyle = currentTrend >= 0 ? "wallet-trend-pos" : "wallet-trend-neg";
    const trendData = [];

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

    return(
        <div id="wallet-container">
            <div className="wallet-header">
                Wallet
            </div>
            <div className="wallet-main">
                    <ul className='wallet-div'>
                        <div className='wallet-pannel-left'>
                            <div id="wallet-balance">
                                Balance: ${balance}
                            </div>
                            <div id="wallet-balance">
                                Buying Power: ${buyingPower}
                            </div>
                            <QRCode className='qrcode' value="http://facebook.github.io/react/" size={180}/>
                            <div id="wallet-button">
                                Send To Friend...
                            </div>
                        </div>
                        <div className='wallet-pannel-right'>
                        <div id={trendStyle}>
                            {trend}
                        </div>
                        <Line
                        className='line-graph'
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
    );
}
export default Wallet;