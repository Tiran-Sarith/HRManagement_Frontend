import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Members() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users data when component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from the API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}users`);
            // Transform the data to match the table structure with keys
            const formattedData = response.data.map((user, index) => ({
                key: user._id,
                name: user.name,
                employeeId: user.employeeId,
                role: user.role,
                email: user.email,
                password: "••••••••" // Passwords should not be displayed in plaintext
            }));
            setData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            message.error("Failed to load users data");
            setLoading(false);
        }
    };

    const handleNavigate = () => {
        navigate('/addmembersaccounts');
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };
    
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
                }}
            >
                Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
        record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
        onOpenChange(open) {
            if (open) {
            setTimeout(() => {
                var _a;
                return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
            }, 100);
            }
        },
        },
        render: text =>
        searchedColumn === dataIndex ? (
            // Using a simple highlight style since Highlighter component might not be imported
            <span style={{ backgroundColor: '#ffc069' }}>
                {text}
            </span>
        ) : (
            text
        ),
    });
    
    const columns = [
        Object.assign(
        { title: 'Employee Name', dataIndex: 'name', key: 'name', width: '20%' },
        getColumnSearchProps('name'),
        ),
        Object.assign(
        { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId', width: '15%' },
        getColumnSearchProps('employeeId'),
        ),
        Object.assign(
        { title: 'Role', dataIndex: 'role', key: 'role', width: '15%' },
        getColumnSearchProps('role'),
        ),
        Object.assign(
        { title: 'E-mail', dataIndex: 'email', key: 'email', width: '25%' },
        getColumnSearchProps('email'),
        ),
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" danger onClick={() => handleDelete(record.key)}>Delete</Button>
                </Space>
            ),
        },
    ];

    // Function to handle edit button click
    const handleEdit = (userId) => {
        navigate(`/membersaccounts/edit/${userId}`);
    };

    // Function to handle delete button click
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${API_BASE_URL}users/delete/${userId}`);
            message.success("User deleted successfully");
            // Refresh the data
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user");
        }
    };

    return (
        <div>
            <Button type="primary" className="ml-[950px] mb-6 bg-green-700" onClick={handleNavigate}>
                Add Member
            </Button>

            <Table 
                columns={columns} 
                dataSource={data} 
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
}

export default Members;
