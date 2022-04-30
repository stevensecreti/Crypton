import React, { useRef } from 'react'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";


function MarketGraph({ price, data, pair }) {
    ChartJS.register(...registerables);

    const opts = {
        tooltips: {
            intersect: false,
            mode: "index"
        },
        responsive: true,
        maintainAspectRatio: false
    };

    if(price === '0.00'){
        return(<h2>Please select a currency pair</h2>);
    }
    return(
        <div className="marketCoinData">
            <h2>{`${pair}:       $${price}`}</h2>

            <div className="marketGraphContainer">
                {data && <Line data={data} options={opts}/>}
            </div>
        </div>
    );
}

export default MarketGraph;