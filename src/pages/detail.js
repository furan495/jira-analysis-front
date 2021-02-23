import moment from 'moment'
import Highcharts from 'highcharts'
import React, { useEffect } from 'react'
import { dataFormat } from '../utils/utils'
import { Card, Row, Col, Space, Table, DatePicker } from 'antd'

export default props => {

    const project = JSON.parse(window.sessionStorage.getItem('project'))
    const dataSource = project.issue.flatMap(item => ({
        key: item.key,
        keyword: item.key,
        summary: item.fields?.summary ?? '无',
        issueType: item.fields?.issuetype.name ?? '无',
        assignee: item.fields?.assignee?.displayName ?? '无',
        reporter: item.fields?.reporter?.displayName ?? '无',
        created: moment(item.fields?.created).format('YYYY-MM-DD') ?? '-',
    }))

    const columns = [
        {
            title: '问题类别', dataIndex: 'issueType', width: '10%', ellipsis: true,
            filters: Array.from(new Set(dataSource.flatMap(item => item.issueType))).flatMap(item => ({ text: item, value: item })),
            onFilter: (value, record) => record.issueType.indexOf(value) === 0
        },
        { title: '关键字', dataIndex: 'keyword', width: '10%', ellipsis: true },
        { title: '概要', dataIndex: 'summary', ellipsis: true },
        {
            title: '创建日期', dataIndex: 'created', width: '10%', ellipsis: true,
            filters: Array.from(new Set(dataSource.flatMap(item => item.created.slice(0, 7)))).flatMap(item => ({ text: item, value: item })),
            onFilter: (value, record) => record.created.indexOf(value) === 0
        },
        { title: '报告人', dataIndex: 'reporter', width: '10%', ellipsis: true },
        {
            title: '经办人', dataIndex: 'assignee', width: '10%', ellipsis: true,
            filters: Array.from(new Set(dataSource.flatMap(item => item.assignee))).flatMap(item => ({ text: item, value: item })),
            onFilter: (value, record) => record.assignee.indexOf(value) === 0
        },
    ]

    const filterChart = (
        <DatePicker.RangePicker picker='month' />
    )

    useEffect(() => {
        Highcharts.chart('container', {
            credits: false,
            title: { text: null },
            yAxis: { title: false },
            chart: { type: 'column' },
            tooltip: { shared: true },
            legend: { enabled: true },
            series: dataFormat(project),
            plotOptions: { column: { dataLabels: { enabled: true } } },
            xAxis: {
                crosshair: true,
                categories: [
                    '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
                ],
            },
        })
    }, [])

    return (
        <div style={{ marginTop: 64 }}>
            <Row gutter={[24, 24]}>
                <Col span={18}>
                    <Card title={`${project.name}问题统计`} extra={filterChart}>
                        <div id='container' style={{ height: '30vh' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Space direction='vertical' size={24} style={{ width: '100%' }}>
                        <Card style={{ height: 'calc(20vh - 12px)' }}></Card>
                        <Card style={{ height: 'calc(22vh - 12px)' }}></Card>
                    </Space>
                </Col>
            </Row>
            <Card title='问题详细' style={{ marginTop: 24 }}>
                <Table size='small' columns={columns} dataSource={dataSource}
                    pagination={{ showSizeChanger: true, showTotal: total => `共${total}条数据` }} />
            </Card>
        </div>
    )
}