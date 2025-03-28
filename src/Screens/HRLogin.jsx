import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HRLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Validate email and password are not empty
            if (!email || !password) {
                message.error('Please enter both email and password');
                return;
            }

            // Make login request to backend
            const response = await axios.post('http://localhost:8070/api/auth/login', {
                email,
                password
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);

            // Show success message
            message.success('Login Successful');

            // Redirect based on user role (you can modify this logic as needed)
            navigate('/hrHome');
        } catch (error) {
            // Handle login errors
            message.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    const onFinish = (values) => {
        handleLogin();
    };

    return (
        <div className='flex justify-center items-center mt-32'>
            <Form
                className='mb-36 border rounded-lg p-8 bg-green-50'
                name="login"
                layout="vertical"
                onFinish={onFinish}
                style={{
                    maxWidth: 360,
                }}
            >
                <h1 className='text-2xl font-bold mb-4 text-green-700'>Login</h1>
                
                <Form.Item
                    label="User Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="User email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        className='bg-green-900 w-72 text-white font-bold' 
                        type="primary"
                        htmlType="submit"
                    >
                        Log in
                    </Button>   
                </Form.Item>
            </Form>
        </div>
    );
};

export default HRLogin;