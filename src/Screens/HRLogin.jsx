import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {app} from '../../FirebaseAuth'
import { useNavigate } from 'react-router-dom';

function HRLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const auth = getAuth(app);

    const handleLogin = async (e) => {

        e.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logging Success');
            
            navigate('/hrHome');
        }
        catch(error){
            console.log(error.message);
        }
    }



    return (
        <div className='flex justify-center items-center mt-32'>
            <Form
                className='mb-36 border rounded-lg p-8 bg-green-50'
                name="login"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
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
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                
                <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
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
                        type="submit"
                        onClick={handleLogin}
                    >
                        Log in
                    </Button>   
                </Form.Item>
            </Form>
        </div>
    );
}

export default HRLogin;