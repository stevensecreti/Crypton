export const MarketDataFormatter = (data) =>{
    let finalData = {
        labels: [],
        datasets: [{
            label: "Price ($)",
            data: [],
            backgroundColor: "rgb(42, 122, 120, 0.8)",
            borderColor: "rgba(42, 122, 120, 0.2)",
            fill: false
        }]
    };

    let dates = data.map((val) => {
        const ts = val[0];
        let date = new Date(ts * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let final = `${month}-${day}-${year}`
        return final;
    });

    let priceArr = data.map((val) => {
        return val[4];
    });

    priceArr.reverse()
    dates.reverse()
    finalData.labels = dates;
    console.log("FinalData Labels", finalData.labels);
    finalData.datasets[0].data = priceArr;
    console.log("finalData.datasets", finalData.datasets)

    console.log('final data', finalData);

    return (finalData);
}

export default MarketDataFormatter;