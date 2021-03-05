import moment from 'moment'
import { BaseChart } from './chart'
import { request } from '../utils/request'
import { dataFormat } from '../utils/utils'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Space, Table, DatePicker } from 'antd'

export default props => {

    const user = JSON.parse(window.sessionStorage.getItem('user'))

    const [project, setProject] = useState({})
    const [dataSource, setDataSource] = useState([])
    const [timeRange, setTimeRange] = useState(['startOfYear()', 'endOfDay()'])

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

    const dateFilter = e => {
        setTimeRange(e.flatMap(item => moment(moment(item).format('YYYY-MM-DD')).valueOf()))
    }

    useEffect(() => {
        request(`api/projects${props.location.search}&assignee=${user.name}&created=${timeRange[0]}&updated=${timeRange[1]}`).then(res => {
            const issueTypes = res.data.issueTypes.filter(item => item.includes('online') || ['代码错误', '界面错误', '数据问题'].includes(item))
            const dataSource = res.data.issue.filter(item => issueTypes.includes(item.fields?.issuetype.name)).flatMap(item => ({
                key: item.key,
                keyword: item.key,
                summary: item.fields?.summary ?? '无',
                issueType: item.fields?.issuetype.name ?? '无',
                assignee: item.fields?.assignee?.displayName ?? '无',
                reporter: item.fields?.reporter?.displayName ?? '无',
                created: moment(item.fields?.created).format('YYYY-MM-DD') ?? '-',
            }))
            setDataSource(dataSource)
            setProject(res.data)
        })
    }, [timeRange])

    return (
        <div style={{ marginTop: 64 }}>
            <Row gutter={[24, 24]}>
                <Col span={18}>
                    <Card title={`${props.location.query.name}问题统计`} extra={<DatePicker.RangePicker picker='month' onChange={dateFilter} />}>
                        <BaseChart id='column' type='column' data={dataFormat(project)} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Space direction='vertical' size={24} style={{ width: '100%' }}>
                        <Card style={{ height: 'calc(20vh - 12px)' }}>

                        </Card>
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