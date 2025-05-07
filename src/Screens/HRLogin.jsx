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
            // navigate('/dashboard');
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

// import React, { useState } from 'react';
// import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import { Button, Form, Input, message } from 'antd';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const HRLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             if (!email || !password) {
//                 message.error('Please enter both email and password');
//                 return;
//             }

//             const response = await axios.post('http://localhost:8070/api/auth/login', {
//                 email,
//                 password
//             });

//             localStorage.setItem('token', response.data.token);
//             message.success('Login Successful');
//             navigate('/admin/dashboard');
//         } catch (error) {
//             message.error(error.response?.data?.message || 'Login failed. Please try again.');
//         }
//     };

//     const onFinish = () => {
//         handleLogin();
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 px-4">
//             <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
//                 <h2 className="text-3xl font-extrabold text-center text-green-800 mb-6">HR Admin Login</h2>

//                 <Form
//                     name="login"
//                     layout="vertical"
//                     onFinish={onFinish}
//                     className="space-y-4"
//                 >
//                     <Form.Item
//                         label={<span className="text-green-800 font-semibold">Email</span>}
//                         name="email"
//                         rules={[{ required: true, message: 'Please input your email!' }]}
//                     >
//                         <Input
//                             prefix={<UserOutlined className="text-green-600" />}
//                             placeholder="you@example.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="hover:border-green-500 focus:border-green-700 transition-all duration-300"
//                         />
//                     </Form.Item>

//                     <Form.Item
//                         label={<span className="text-green-800 font-semibold">Password</span>}
//                         name="password"
//                         rules={[{ required: true, message: 'Please input your password!' }]}
//                         hasFeedback
//                     >
//                         <Input.Password
//                             prefix={<LockOutlined className="text-green-600" />}
//                             placeholder="Your password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="hover:border-green-500 focus:border-green-700 transition-all duration-300"
//                         />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button
//                             type="primary"
//                             htmlType="submit"
//                             className="w-full bg-green-800 hover:bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md transition duration-200"
//                             >
//                             Log In
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         </div>
//     );
// };

// export default HRLogin;
