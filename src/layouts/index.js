import React from 'react'
import { Redirect } from 'umi'
import styles from './index.less'
import zhCN from 'antd/lib/locale/zh_CN'
import { Layout, Avatar, Space, ConfigProvider } from 'antd'

const { Header, Content } = Layout

export default props => {

    const route = props.location.pathname
    const user = JSON.parse(window.sessionStorage.getItem('user'))

    return (
        route === '/' ?
            <Redirect to='login' /> :
            <ConfigProvider locale={zhCN}>
                <Layout>
                    {route === '/login' ? null :
                        <Header className={styles.header}>
                            {/* <Space direction='horizontal' style={{ marginLeft: 'auto', cursor: 'pointer' }}>
                            <Avatar src={user.avatar} />
                            <span>{user.name}</span>
                        </Space> */}
                        </Header>
                    }
                    <Content style={{ padding: 24, minHeight: '100vh' }}>
                        {props.children}
                    </Content>
                </Layout>
            </ConfigProvider>
    )
}
