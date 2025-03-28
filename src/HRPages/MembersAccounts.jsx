import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../FirebaseAuth';
import {
  AutoComplete,
  Button,
  Form,
  Input,
  Select,
  message,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

function MembersAccounts() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUserCreate = async (values) => {
    const auth = getAuth(app); // Initialize Firebase Auth
    const { email, password } = values; // Extract email and password from form values

    try {
      setLoading(true); // Set loading state
      await createUserWithEmailAndPassword(auth, email, password);
      message.success('User created successfully!'); // Show success message
    } catch (error) {
      message.error(error.message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1 className="text-start text-xl font-bold pb-10">Member Accounts</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleUserCreate} // Call handleUserCreate when form is submitted
        initialValues={{ prefix: '86' }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="EmployeeName"
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
          name="EmployeeID"
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
              message: 'Please select a role!',
            },
          ]}
        >
          <Select placeholder="Select the role">
            <Option value="Member">Member</Option>
            <Option value="Admin">Admin</Option>
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
