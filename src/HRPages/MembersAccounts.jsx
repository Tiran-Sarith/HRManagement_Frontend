import React, { useState } from 'react';

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {app} from '../../FirebaseAuth'


import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// Add residences data
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
];

function MembersAccounts() {
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const auth = getAuth(app);
  
  const handleUserCreate = async (e) => {
      try{
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created');
              
        }
        catch(error){
            console.log(error.message);
        }

        
    }

  return (
    <div>
      <h1 className='text-start text-xl font-bold pb-10'>Member Accounts</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleUserCreate}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        
        <Form.Item
          name="Employee Name"
          label="Employee Name"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="Department"
          label="Department"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Employee ID"
          label="Employee ID"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Username"
          label="Username"
          rules={[
            {
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input 
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MembersAccounts;