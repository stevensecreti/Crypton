import React, {useState} from 'react';
import MarketGraph from './MarketGraph'

const Market = (props) => {
    return(
        <div className="marketScreen">
            <div className="marketHeader">
                Market Data
            </div>
            <div className="marketMain">
                <div className="marketMainContents">
                    <div className="marketCoinList">
                        <div className="marketCoinListHeader">
                            Coins
                        </div>
                        <div className="marketCoins">

                        </div>
                    </div>
                    <div className="marketChart">
                        <div className="marketChartHeader">
                            Graph
                        </div>
                        <div className="marketChartWrapper">
                            <MarketGraph/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Market;