import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import HorizontalScroll from 'react-scroll-horizontal';
    const Chart = (finalTrend) => {
        //local-storage 인덱스
    //const accounts = props.trendSum.map(val=>val.balance);
    //console.log(Object.values(props['finalTrend']['0'].time));

    const [dataLabel, setDataLabel] = useState([]);
    const [balanceLabel, setBalanceLabel] = useState([]);
    var index = 0;
    //console.log(finalTrend['finalTrend'])

    useEffect(() => {
        setDataLabel(dataLabel => [...dataLabel, finalTrend['finalTrend'][index].time]);
        setBalanceLabel([...balanceLabel, finalTrend['finalTrend'][index].balance]);
        index = index + 1;
    }, [finalTrend['finalTrend'][index].time], [finalTrend['finalTrend'][index].balance]);
    console.log(dataLabel);

    //console.log(newString)
    // newString = newString.concat(props['finalTrend']['0'].time);
    // console.log(newString)

    // setDataLabel(props.concat(props['finalTrend']['0'].time));
    // console.log(dataLabel);
    const ChartData = {
        labels : dataLabel,
        datasets : [
            {
            label: 'Balance',
            fill: false,
            lineTension: 1,
            backgroundColor: '#013292',
            borderColor: '#013292',
            borderWidth: 1,
            data : balanceLabel
            }
        ]
    }

    // useEffect(() => {
	// 	if (balance != null) {
    //         setDataLabel([...dataLabel, balance]);
	// 	}
	// }, [balance]);

    return (
            <div className='line-graph'>
            <HorizontalScroll>
                <Line
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
                                data={ChartData}
                >
                </Line></HorizontalScroll>
            </div>
    )
}
export default Chart;