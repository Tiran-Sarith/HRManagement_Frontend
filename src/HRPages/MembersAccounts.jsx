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
  
  const handleUserCreate = async (values) => {
    try {
      setLoading(true);
      // Prepare the data to send to the backend
      const userData = {
        name: values['Employee Name'],
        department: values['Department'],
        employeeId: values['Employee ID'],
        role: values['role'] === 'female' ? 'admin' : 'member', // Mapping role to backend expectation
        email: values['email'],
        password: values['password']
      };

      // Send POST request to backend signup endpoint
      const response = await axios.post('http://localhost:8070/api/user/register', userData);
      
      // Show success message
      message.success('User created successfully!');
      
      // Reset form after successful submission
      form.resetFields();
    } catch (error) {
      // Handle error
      console.error('Signup error:', error);
      message.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
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