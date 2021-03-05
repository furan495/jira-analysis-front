import Highcharts from 'highcharts'
import React, { useEffect } from 'react'

export const BaseChart = ({ id, type, data }) => {

    useEffect(() => {
        Highcharts.chart(id, {
            series: data,
            credits: false,
            chart: { type },
            title: { text: null },
            yAxis: { title: false },
            tooltip: { shared: true },
            legend: { enabled: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            xAxis: {
                crosshair: true,
                categories: [
                    '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
                ],
            },
        })
    }, [data])

    return <div id={id} style={{ height: '30vh' }} />
}