import { Link } from 'umi'
import { request } from '../utils/request'
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Avatar, Spin, Space } from 'antd'

export default props => {

	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const projectList = JSON.parse(window.sessionStorage.getItem('projects'))
		if (projectList) {
			setProjects(projectList)
			setLoading(false)
		} else {
			request('api/projects').then(res => {
				const projects = res.data.flatMap(item => {
					return {
						...item,
						assignee: Array.from(new Set(item.issue.flatMap(issue => issue.fields.assignee).flatMap(i => i?.name)))
					}
				})
				setProjects(projects)
				window.sessionStorage.setItem('projects', JSON.stringify(projects))
				setLoading(false)
			})
		}
	}, [])

	return (
		<Row gutter={[24, 24]} style={{ marginTop: 64, padding: '0 240px' }}>
			{loading ? <Spin size='large' style={{ margin: 'auto', marginTop: '20vh' }} /> :
				projects.map(item => (
					<Col span={6} key={item.key}>
						<Link to={encodeURI(`detail?key=${item.key}&name=${item.name}`)} >
							<Card
								hoverable
								style={{ background: item.assignee.includes('chunhuizhang') ? 'aquamarine' : 'white' }}>
								<Card.Meta
									title={item.name}
									avatar={<Avatar src={item.avatar} />}
									description={
										<Space direction='vertical'>
											<span>负责人:{item.lead}</span>
											<span>关键字:{item.key}</span>
										</Space>
									} />
							</Card>
						</Link>
					</Col>
				))
			}
		</Row>
	)
}
