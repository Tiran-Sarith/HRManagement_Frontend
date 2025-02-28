import React, { useState, useEffect } from 'react';
import { Flex, Table, Tag, Transfer, message } from 'antd';
import axios from 'axios';

const TableTransfer = (props) => {
  const { leftColumns, rightColumns, ...restProps } = props;
  return (
    <Transfer
      style={{
        width: '100%',
      }}
      {...restProps}
    >
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection = {
          getCheckboxProps: () => ({
            disabled: listDisabled,
          }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace');
          },
          selectedRowKeys: listSelectedKeys,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
        };
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{
              pointerEvents: listDisabled ? 'none' : undefined,
            }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) {
                  return;
                }
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
};

const columns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Employee ID',
    render: (tag) => (
      <Tag
        style={{
          marginInlineEnd: 0,
        }}
        color="cyan"
      >
        {tag}
      </Tag>
    ),
  },
  {
    dataIndex: 'description',
    title: 'Department',
  },
];

const filterOption = (input, item) => 
  item.title?.toLowerCase().includes(input.toLowerCase()) || 
  item.tag?.toLowerCase().includes(input.toLowerCase()) ||
  item.description?.toLowerCase().includes(input.toLowerCase());

const EmployeeAssigning = ({ projectId }) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8070/employee/Eview');
      const formattedData = response.data.map((employee) => ({
        key: employee._id,
        title: employee.employee_full_name,
        tag: employee.employee_id,
        description: employee.employee_department,
        employee_id: employee._id,
      }));
      setEmployeeData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      message.error('Failed to load employees');
      setLoading(false);
    }
  };

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleAssignEmployees = async () => {
    if (!projectId) {
      message.error('Project ID is missing');
      return false;
    }

    try {
      // Update all selected employees with the project ID
      const updatePromises = targetKeys.map(employeeKey => {
        const employee = employeeData.find(emp => emp.key === employeeKey);
        return axios.put(`http://localhost:8070/employee/Eupdate/${employeeKey}`, {
          employee_current_project_id: projectId
        });
      });
      
      await Promise.all(updatePromises);
      message.success('Employees assigned successfully');
      return true;
    } catch (error) {
      console.error('Error assigning employees:', error);
      message.error('Failed to assign employees to the project');
      return false;
    }
  };

  return (
    <Flex align="start" gap="middle" vertical className='w-[900px]'>
      <TableTransfer
        dataSource={employeeData}
        targetKeys={targetKeys}
        disabled={loading}
        showSearch
        showSelectAll={false}
        onChange={onChange}
        filterOption={filterOption}
        leftColumns={columns}
        rightColumns={columns}
      />
      {/* We don't need to add a button here as the modal already has OK button */}
    </Flex>
  );
};

export default EmployeeAssigning;