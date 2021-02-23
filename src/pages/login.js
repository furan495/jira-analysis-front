import React from 'react'
import { history } from 'umi'
import * as THREE from 'three'
import { request } from '../utils/request'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined, CloudServerOutlined } from '@ant-design/icons'


export default props => {
    const [form] = Form.useForm()

    const login = async () => {
        try {
            const data = await form.validateFields()
            request('api/login', { method: 'POST', body: data }).then(response => {
                if (response.res === 'succ') {
                    window.sessionStorage.setItem('user', JSON.stringify(response))
                    history.push('index')
                } else {
                    message.error('用户名或密码错误')
                }
            })
        } catch (e) { console.log(e) }
    }

    

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Form form={form} onFinish={login} style={{ width: '20vw', position: 'absolute' }}>
                <Form.Item name='server' initialValue='http://192.168.60.31:8080/' rules={[{ required: true, message: '字段不能为空' }]}>
                    <Input prefix={<CloudServerOutlined />} placeholder='请输入服务器地址' />
                </Form.Item>
                <Form.Item name='username' rules={[{ required: true, message: '字段不能为空' }]}>
                    <Input prefix={<UserOutlined />} placeholder='请输入用户名' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: '字段不能为空' }]}>
                    <Input prefix={<LockOutlined />} type='password' placeholder='请输入密码' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ width: '100%' }}>登陆</Button>
                </Form.Item>
            </Form>
            <div />
        </div>
    )
}