import React, {useState, useRef, useEffect} from 'react';
import MarketGraph from './MarketGraph'
import MarketDataFormatter from './MarketDataFormatter'
import CoinSelection from './CoinSelection';

const Market = (props) => {
    const[currencies, setCurrencies] = useState([]);
    const [pair, setPair] = useState("");
    const [price, setPrice] = useState('0.00');
    const [pastData, setPastData] = useState({});
    const [dataRetrieved, setDataRetrieved] = useState(true);
    const ws = useRef(null);

    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    useEffect(() => {
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        props.storeSock(ws.current);
        let pairs = [];
        const apiCall = async () =>{
            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));
            console.log("pairs", pairs);
            let filtered = pairs.filter((pair) => {
                if(pair.quote_currency === "USD"){
                    return pair;
                }
            });

            filtered = filtered.sort((a, b) => {
                if(a.base_currency < b.base_currency){
                    return -1;
                }
                if(a.base_curreny > b.base_currency) return 1;
                else return 0;
            });

            console.log("filtered", filtered);
            setCurrencies(filtered);
            first.current = true;
        };
        apiCall();
    }, []);

    useEffect(() => {
        if (!first.current){
            console.log("Returning on first API call");
            setDataRetrieved(false);
            return;
        }

        console.log("Running pair change");
        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let jsonMsg = JSON.stringify(msg);

        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoricalData = async () => {
            let dataArr = [];
            await fetch(historicalDataURL)
                    .then((res) => res.json())
                    .then((data) => (dataArr = data));
            console.log(dataArr);
            let formattedData = MarketDataFormatter(dataArr);
            setPastData(formattedData);
            setDataRetrieved(true);
        };

        fetchHistoricalData();

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if(data.type !== "ticker"){
                console.log("non ticker event", e);
                setPrice("N/A")
                return;
            }
            if(data.product_id === pair){
                console.log("Price", data.price);
                setPrice(data.price);
            }
            
        };
    }, [pair]);

    const handleSelect = (value) =>{
        console.log("target val", value);

        let unsubMsg = {
            type: 'unsubscribe',
            product_ids: [pair],
            channels:['ticker']
        };

        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub);

        setPair(value);
    }


    return(
        <div className="screenContainer">
            <div className="marketScreen">
                <div className="screenHeader">
                    Market Data
                </div>
                <div className="screenMain">
                    <div className="marketMainContents">
                        <div className="marketCoinSelect">
                            {currencies.map((cur, idx) => {
                                return(<CoinSelection key={idx} value={cur.id} name={cur.display_name} handleSelect={handleSelect}/>);
                                //return(<option key={idx} value={cur.id}>{cur.display_name}</option>);
                            })}  
                        </div>                    
                        <div className="marketGraph">
                            {dataRetrieved ? <MarketGraph price={price} data={pastData} pair={pair}/> :
                            <text>Please Select a Token.</text>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Market;