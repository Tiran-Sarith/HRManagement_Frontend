import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import axios from 'axios'; // Added axios for API communication
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Typography,Box} from "@mui/material";
import { useNavigate } from 'react-router-dom';

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
    try {
      setLoading(true);
      
      // Prepare data according to your backend API structure
      const userData = {
        name: values.EmployeeName,
        department: values.Department,
        employeeId: values.EmployeeID,
        role: values.role.toLowerCase(), // Convert to lowercase to match enum in model
        email: values.email,
        password: values.password
      };

      // Make API call to your backend endpoint
      const response = await axios.post(`${API_BASE_URL}user/register`, userData);
      
      if (response.status === 201) {
        message.success('User created successfully!');
        form.resetFields(); // Reset form after successful submission
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

      const navigate = useNavigate();

      const handleNavigation = () => {
          navigate('/membersaccounts');
      };

  return (
    <div>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer', width: 'fit-content' }} onClick={handleNavigation}>
                    <IconButton size="small" sx={{ p: 0, pr: 1, color: 'green' }}>
                    <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ color: 'green' }}>
                    Go Back
                    </Typography>
                </Box>  
    <div className='ml-32 mt-10'>
      <h1 className="text-start text-xl font-bold pb-10">Member Accounts</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleUserCreate}
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
            <Option value="member">Member</Option>
            <Option value="admin">Admin</Option>
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
    </div>
  );
}

export default MembersAccounts;
