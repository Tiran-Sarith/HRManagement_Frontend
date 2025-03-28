import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with: npm install axios

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
  message, // Added for showing success/error messages
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

function MembersAccounts() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  

  const handleUserCreate = async (e) => {
      try{
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created');
          alert('User created successfully!');
        }
        catch(error){
            console.log(error.message);
        }

        
    }
  };

  return (
    <div>
      <h1 className='text-start text-xl font-bold pb-10'>Member Accounts</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleUserCreate}
        initialValues={{
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
              required: true,
              message: 'Please input employee name!',
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
              required: true,
              message: 'Please input department!',
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
              required: true,
              message: 'Please input employee ID!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please select a role!'
            }
          ]}
        >
          <Select placeholder="Select the role">
            <Option value="male">Member</Option>
            <Option value="female">Admin</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MembersAccounts;