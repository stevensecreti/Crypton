import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import HorizontalScroll from 'react-scroll-horizontal';
    const Chart = (finalTrend, accountAddress) => {
    const [dataLabel, setDataLabel] = useState([]);
    const [balanceLabel, setBalanceLabel] = useState([]);
    var index = 0;  
    const [exist, setExist] = useState(false);
    
    // function updateChart(){
    //     for(let i = 1; i < localStorage.getItem('finals').length; i++){
    //         if(localStorage.getItem('finals')[i][0].accounts == accountAddress){
    //             setDataLabel(dataLabel => [...dataLabel, localStorage.getItem('finals')[i][0].time]);
    //             setBalanceLabel([...balanceLabel, localStorage.getItem('finals')[i][0].balance]);
    //             index = index + 1;
    //         }
    //     }
    //     setExist(true);
    // }

    useEffect(() => {
        
        if(localStorage.getItem('finals') == null){
                localStorage.setItem("finals", JSON.stringify(finalTrend['finalTrend']));
        }

        // if(!exist && localStorage.getItem('finals') != null){
        //     //function 만들어서 처음 chart data 세팅
        //     updateChart();
        // }
        var final2 = JSON.parse(localStorage.getItem('finals')) || [];
        // console.log(final2[2][0].accounts);
        
        if(balanceLabel.length == 1 && balanceLabel[0] == 0){
            dataLabel.shift();
            balanceLabel.shift();
        }
        if(balanceLabel[index] != finalTrend['finalTrend'][0].balance){
            setDataLabel(dataLabel => [...dataLabel, finalTrend['finalTrend'][index].time]);
            setBalanceLabel([...balanceLabel, finalTrend['finalTrend'][index].balance]);
            index = index + 1;
            }
            if(localStorage.getItem('finals') != null){
                var final = JSON.parse(localStorage.getItem('finals')) || [];
                    final.push(finalTrend['finalTrend']);
                    localStorage.setItem('finals', JSON.stringify(final));   
            }
    }, [finalTrend['finalTrend'][index].time], [finalTrend['finalTrend'][index].balance]);

    const ChartData = {
        labels : dataLabel,
        datasets : [
            {
            Label: 'Balance',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#013292',
            borderColor: '#013292',
            borderWidth: 2,
            data : balanceLabel
            }
        ]
    }
    return (
            <div className='line-graph'>
            <HorizontalScroll>
                <Line
                data={ChartData}
                                options={{
                                    title:{
                                    display:true,
                                    text:'',
                                    fontSize:20
                                    },
                                    legend:{
                                    display:true,
                                    position:'right'
                                    }
                                }}
                                
                >
                </Line></HorizontalScroll>
            </div>
    )
}
export default Chart;