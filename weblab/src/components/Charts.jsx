import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryLine, VictoryLabel, VictoryScatter } from 'victory';
import { getChartsWeeks, getChartsMonths, getChartsYears } from '../services/db/charts/apiCharts';

function Charts() {
    const containerStyle = {
        display: 'flex',
        height: '50vh',
        width: '85vw'
    };

    const columnStyle = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const [weekChart, setWeekChart] = useState([{ x: 1, y: 0}]);
    const [monthChart, setMonthChart] = useState([{ x: 1, y: 0}]);
    const [yearChart, setYearChart] = useState([{ x: 2021, y: 0}]);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    useEffect(() => {
        fetchYearChart();
    }, []);

    useEffect(() => {
        fetchMonthChart(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        fetchWeekChart(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const fetchWeekChart = async (month, year) => {
        console.log('fetchWeekChart: ', month, year);
        const data = await getChartsWeeks(year, month);
        console.log('data: ', data);
        const formattedData = data.map(item => ({
            x: `${item.week_number}`,
            y: item.total_sales
        }));
        setWeekChart(formattedData);
    };

    const monthNamesLegend = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fetchMonthChart = async (year) => {
        const data = await getChartsMonths(year);
        const formattedData = data.map(item => ({
            x: `${monthNamesLegend[item.month_number - 1]}`,
            y: item.total_sales
        }));
        setMonthChart(formattedData);
    };

    const fetchYearChart = async () => {
        const data = await getChartsYears();
        const formattedData = data.map(item => ({
            x: `${item.year_number}`,
            y: item.total_sales
        }));
        setYearChart(formattedData);
    };

    const handleYearClick = (event, data) => {
        const year = parseInt(data.datum.x);
        setSelectedYear(year);
        setSelectedMonth(1);
    };

    const monthAbbreviations = {
        "Jan": 1,
        "Feb": 2,
        "Mar": 3,
        "Apr": 4,
        "May": 5,
        "Jun": 6,
        "Jul": 7,
        "Aug": 8,
        "Sep": 9,
        "Oct": 10,
        "Nov": 11,
        "Dec": 12
    };
    const handleMonthClick = (event, data) => {
        const monthAbbreviation = data.datum.x;
        const month = monthAbbreviations[monthAbbreviation];
        setSelectedMonth(month);
    };    

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentWeek = Math.ceil(new Date().getDate() / 7);

    let averageWeek;
    if (currentYear === selectedYear && currentMonth === selectedMonth) {
        averageWeek = weekChart.reduce((sum, item) => sum + item.y, 0) / currentWeek;
    } else {
        averageWeek = weekChart.reduce((sum, item) => sum + item.y, 0) / weekChart.length;
    }

    let averageMonth;
    if (currentYear === selectedYear) {
        averageMonth = monthChart.reduce((sum, item) => sum + item.y, 0) / currentMonth;
    } else {
        averageMonth = monthChart.reduce((sum, item) => sum + item.y, 0) / monthChart.length;
    }
    const averageYear = yearChart.reduce((sum, item) => sum + item.y, 0) / yearChart.length;
    
    const maxWeek = Math.max(...weekChart.map(item => item.y));
    const maxMonth = Math.max(...monthChart.map(item => item.y));
    const maxYear = Math.max(...yearChart.map(item => item.y));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[selectedMonth - 1];

    console.log('weekChart: ', weekChart);

    return (
        <div>
            <h1 className='text-center'>Charts</h1>
            <div style={containerStyle}>
                <div style={columnStyle}>
                    <div>
                        <VictoryChart domainPadding={10} style={{ parent: { boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)' } }}>
                            <VictoryLabel text={`WEEKLY CHART REVENUE (${monthName} ${selectedYear})`} x={225} y={285} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
                            <VictoryBar
                                cornerRadius={{ top: 10 }}
                                style={{ data: { fill: "#FFA500" } }}
                                data={weekChart}
                                barWidth={20}
                                labels={({ datum }) => datum.y === 0 ? '' : Math.round(datum.y)}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 } }} y={() => maxWeek}/>
                            <VictoryScatter
                                data={[{ y: maxWeek }]}
                                labels={() => ['Max', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 }} } y={() => averageWeek}/>
                            <VictoryScatter
                                data={[{ y: averageWeek }]}
                                labels={() => ['Average', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                        </VictoryChart>
                    </div>
                </div>
                <div style={columnStyle}>
                    <div>
                        <VictoryChart domainPadding={10} style={{ parent: { boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)' } }}>
                            <VictoryLabel text={`MONTHLY CHART REVENUE (${selectedYear})`} x={225} y={285} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
                            <VictoryBar
                                cornerRadius={{ top: 10 }}
                                style={{ data: { fill: "#FFA500" } }}
                                data={monthChart}
                                barWidth={20}
                                labels={({ datum }) => datum.y === 0 ? '' : Math.round(datum.y)}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onClick: handleMonthClick
                                    }
                                }]}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 } }}
                                y={() => maxMonth}/>
                            <VictoryScatter
                                data={[{ y: maxMonth }]}
                                labels={() => ['Max', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 }} } y={() => averageMonth}/>
                            <VictoryScatter
                                data={[{ y: averageMonth }]}
                                labels={() => ['Average', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                        </VictoryChart>
                    </div>
                </div>
                <div style={columnStyle}>
                    <div>
                        <VictoryChart domainPadding={10} style={{ parent: { boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)' } }}>
                            <VictoryLabel text="YEARLY CHART REVENUE" x={225} y={285} textAnchor="middle" style={{ fontWeight: 'bold' }}/>
                            <VictoryBar
                                cornerRadius={{ top: 10 }}
                                style={{ data: { fill: "#FFA500" } }}
                                data={yearChart}
                                barWidth={20}
                                labels={({ datum }) => datum.y === 0 ? '' : Math.round(datum.y)}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onClick: handleYearClick
                                    }
                                }]}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 } }} y={() => maxYear}/>
                            <VictoryScatter
                                data={[{ y: maxYear }]}
                                labels={() => ['Max', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                            <VictoryLine style={{ data: { stroke: "green", strokeWidth: 1 }} } y={() => averageYear}/>
                            <VictoryScatter
                                data={[{ y: averageYear }]}
                                labels={() => ['Average', 'Sales']}
                                labelComponent={<VictoryLabel x={420} style={{ fontWeight: 'bold', fill: "green" }}/>}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;