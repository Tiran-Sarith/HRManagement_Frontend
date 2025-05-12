import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HRLogin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const { email, password } = values;
            
            // Make login request to backend
            const response = await axios.post(`${API_BASE_URL}auth/login`, {
                email,
                password
            });

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Store user info if needed (can be extracted from JWT)
            try {
                // Basic JWT payload extraction (not complete verification)
                const base64Url = response.data.token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const payload = JSON.parse(window.atob(base64));
                
                // Store user role and other info if needed
                localStorage.setItem('userRole', payload.role);
                localStorage.setItem('userName', payload.name);
                localStorage.setItem('userEmail', payload.email);
            } catch (err) {
                console.error('Error parsing JWT:', err);
            }

            // Show success message
            message.success('Login Successful');

            // Redirect based on user role
            const token = response.data.token;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            if (payload.role === 'admin') {
                navigate('/dashboard');
            } else if (payload.role === 'hr') {
                navigate('/hrHome');
            } else {
                navigate('/dashboard'); // Default route
            }
        } catch (error) {
            // Handle login errors
            message.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className='flex justify-center items-center mt-32'>
            <Form
                form={form}
                className='mb-36 border rounded-lg p-8 bg-green-50'
                name="login"
                layout="vertical"
                onFinish={handleLogin}
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
                            type: 'email',
                        },
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />} 
                        placeholder="User email"
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
                        prefix={<LockOutlined />}
                        placeholder="Password" 
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