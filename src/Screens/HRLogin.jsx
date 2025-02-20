import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

function HRLogin() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    return (
        <div className='flex justify-center items-center mt-32'>
            <Form
                className='mb-36 border rounded-lg p-8'
                name="login"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360,
                }}
                onFinish={onFinish}
            >
                <h1 className='text-2xl font-bold mb-4 text-green-700'>Login</h1>
                
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Username" 
                    />
                </Form.Item>
                
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input 
                        prefix={<LockOutlined />} 
                        type="password" 
                        placeholder="Password" 
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        className='bg-green-900 w-72 text-white font-bold' 
                        htmlType="submit"
                    >
                        Log in
                    </Button>   
                </Form.Item>
            </Form>
        </div>
    );
}

export default HRLogin;