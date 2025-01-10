"use client"
import styles from "./page.module.scss";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ParsedCountry } from 'react-international-phone';
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";
export default function Test2() {
  const [mockUpData, setMockUpData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ]);

  const handleDelete = (key: unknown) => {
    const updatedData = mockUpData.filter((item: { key: unknown; }) => item.key !== key);
    setMockUpData(updatedData);
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: { key: unknown; }) => (
        <Popconfirm
          title="Are you sure to delete this row?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className={styles.page}>
      <div className={styles.inputFrom}>
        j4465
      </div>
      <div className={styles.tableContent} >
        <Table dataSource={mockUpData} columns={columns} />
      </div>

    </div>
  );
}
