"use client"
import styles from "./page.module.scss";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { ParsedCountry } from 'react-international-phone';
import { Button, Popconfirm, Table, Form, Input, Select, DatePicker, Radio, Row, Col, Flex, PaginationProps, Checkbox } from "antd";
import { use, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/strore/hooks";
import { title } from "process";
import { CustomerDetail, } from "@/strore/slice/customerList";
import { addCustomer, removeCustomer, editCustomer, fetchCustormerInStorage } from "@/strore/slice/customerList";
import Image from "next/image";
import thaiLandPic from "../../../public/Icon/thailand.png";
import AmericanPic from "../../../public/Icon/american.png";
import FrenchPic from "../../../public/Icon/france.png";
import moment from "moment";


export default function Test2() {

  const dispatch = useAppDispatch();
  const customerList = useAppSelector((state) => state.customerList.customer);
  const [iseditingCustomer, setEditingCustomer] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSpecialselectAllChecked] = useState(false);
  const { Option } = Select;
  const IdNumber1 = useRef(null);
  const IdNumber2 = useRef(null);
  const IdNumber3 = useRef(null);
  const IdNumber4 = useRef(null);
  const IdNumber5 = useRef(null);


  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'fontName',
      key: 'fontName',
      sorter: (a: CustomerDetail, b: CustomerDetail) => a.fontName.localeCompare(b.fontName),
      render: (_: unknown, record: CustomerDetail) => (
        <p>{record.fontName + " " + record.LastName}</p>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: (a: CustomerDetail, b: CustomerDetail) => a.gender.localeCompare(b.gender),
    },
    {
      title: 'Mobile Phone',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      sorter: (a: CustomerDetail, b: CustomerDetail) => a.PhoneNumber.localeCompare(b.PhoneNumber),
      render: (_: unknown, record: CustomerDetail) => (
        <p>{record.PhoneNumberCountry + record.PhoneNumber}</p>
      ),
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: (a: CustomerDetail, b: CustomerDetail) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: 'Manage',
      key: 'key',
      render: (_: unknown, record: any) => (
        <div>
          <Button
            style={{
              border: 'none',
              boxShadow: 'none',
            }}
            onClick={() => handleEdit(record)} >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => dispatch(removeCustomer([record]))}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{
                border: 'none',
                boxShadow: 'none',
              }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onInputIdNumberChange = (beforeRef: any, curentRef: any, nextRef: any) => {
    if (curentRef.current.input.value.length === curentRef.current.input.maxLength && nextRef) {
      nextRef.current.focus();
    }
    if (curentRef.current.input.value.length === 0 && beforeRef) {
      beforeRef.current.focus();
    }
  }


  // use effect for fetch data from local storage just one time 
  useEffect(() => {
    dispatch(fetchCustormerInStorage())
  }, [])


  const validateMessages = {
    required: "'${name}' is required!",
    // ...
  };

  const handleClear = () => {
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    console.log("record", record)
    setEditingCustomer(true);
    const splitIdNumber = record.IdNumber.split('-');
    form.setFieldsValue({
      key: record.key,
      title: record.title,
      fontName: record.fontName,
      LastName: record.LastName,
      DateOfBirth: moment(record.DateOfBirth, "YYYY-MM-DD"),
      nationality: record.nationality,
      // IdNumber: record.IdNumber,
      IdNumber1: splitIdNumber[0],
      IdNumber2: splitIdNumber[1],
      IdNumber3: splitIdNumber[2],
      IdNumber4: splitIdNumber[3],
      IdNumber5: splitIdNumber[4],
      gender: record.gender,
      PhoneNumberCountry: record.PhoneNumberCountry,
      PhoneNumber: record.PhoneNumber,
      passport: record.passport,
      salaryExpectations: record.salaryExpectations,
    });


  };

  const onFinish = (values: any) => {
    // iDnumber = all citizenId input
    values['IdNumber'] = values.IdNumber1 + '-' + values.IdNumber2 + '-' + values.IdNumber3 + '-' + values.IdNumber4 + '-' + values.IdNumber5;
    // format DateOfBirth to YYYY-MM-DD
    values.DateOfBirth = values.DateOfBirth.format("YYYY-MM-DD");
    // remove key that not in CustomerDetail
    delete values.IdNumber1
    delete values.IdNumber2
    delete values.IdNumber3
    delete values.IdNumber4

    const Custermer: CustomerDetail = { ...values };
    console.log("Custermer", Custermer)

    if (iseditingCustomer) {
      dispatch(editCustomer(Custermer));
      setEditingCustomer(false);
      alert("Edit Customer Success");
    } else {
      dispatch(addCustomer(Custermer));
      alert("Add Customer Success");
    }

    handleClear();
  };

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any) => setSelectedRowKeys(selectedKeys),
    selections: [
      {
        key: 'selectAll',
        text: 'Select All',
        onSelect: () => setSelectedRowKeys(customerList.map((item) => item.key)),
      },

    ],
  };

  const specialSelecAll = (e: any) => {
    const { checked } = e.target;
    setSpecialselectAllChecked(checked); // Update checkbox state
    if (checked) {
      const allKeys = customerList.map(item => item.key); // Get all keys
      setSelectedRowKeys(allKeys); // Select all rows
    } else {
      setSelectedRowKeys([]); // Deselect all rows
    }
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      alert("Selected row is empty");
      return;
    }
    dispatch(removeCustomer(customerList.filter((item) => selectedRowKeys.includes(item.key))))
    setSelectedRowKeys([]); // Deselect all rows
    setSpecialselectAllChecked(false); // Deselect the "Select All" checkbox
  };

  console.log("customerList", customerList)
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <Form
          form={form}
          layout="horizontal"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={
            {
              passport: "",
              salaryExpectations: "",
              IdNumber1: "",
              IdNumber2: "",
              IdNumber3: "",
              IdNumber4: "",
              IdNumber5: "",
            }
          }
        >
          <Form.Item
            name="key"
            hidden
          >
            <Input />
          </Form.Item>

          <Row>
            <Col span={3}>
              <Form.Item
                label="Title"
                name="title"

                rules={[{ required: true, message: 'Title' }]}
              >
                <Select placeholder="Title">
                  <Option value="Mr">Mr.</Option>
                  <Option value="Mrs">Mrs.</Option>
                  <Option value="Miss">Miss.</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="First Name"
                name="fontName"
                rules={[{ required: true, message: 'First Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true, message: 'Last Name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Form.Item
                label="BirthDay"
                name="DateOfBirth"
                rules={[{ required: true, message: 'Date of Birth' }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Nationality"
                name="nationality"
                rules={[{ required: true, message: 'Nationality' }]}
              >
                <Select placeholder="Nationality">
                  <Option value="thai">Thai</Option>
                  <Option value="french">French</Option>
                  <Option value="american">American</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                label="Citizen ID"
                name="IdNumber1"
                rules={[{ required: false, message: 'Citizen ID' }]}
              >

                <Input
                  ref={IdNumber1}
                  className="citizenId"
                  maxLength={1}
                  style={{ width: "40px" }}
                  onChange={() => onInputIdNumberChange(null, IdNumber1, IdNumber2)}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col>
              <Row>
                <span style={{ marginLeft: "20px", marginRight: "20px" }} >-</span>
                <Form.Item
                  name="IdNumber2"
                  rules={[{ required: false, message: 'Citizen ID' }]}
                >
                  <Input
                    ref={IdNumber2}
                    className="citizenId"
                    maxLength={4}
                    style={{ width: "140px" }}
                    onChange={() => onInputIdNumberChange(IdNumber1, IdNumber2, IdNumber3)}
                    autoComplete="off"

                  />
                </Form.Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <span style={{ marginLeft: "20px", marginRight: "20px" }} >-</span>
                <Form.Item
                  name="IdNumber3"
                  rules={[{ required: false, message: 'Citizen ID' }]}
                >
                  <Input
                    ref={IdNumber3}
                    className="citizenId"
                    maxLength={5}
                    style={{ width: "160px" }}
                    onChange={() => onInputIdNumberChange(IdNumber2, IdNumber3, IdNumber4)}
                    autoComplete="off"

                  />
                </Form.Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <span style={{ marginLeft: "20px", marginRight: "20px" }} >-</span>
                <Form.Item
                  name="IdNumber4"
                  rules={[{ required: false, message: 'Citizen ID' }]}
                >
                  <Input
                    ref={IdNumber4}
                    className="citizenId"
                    maxLength={2}
                    style={{ width: "60px" }}
                    onChange={() => onInputIdNumberChange(IdNumber3, IdNumber4, IdNumber5)}
                    autoComplete="off"

                  />
                </Form.Item>
              </Row>
            </Col>
            <Col>
              <Row>
                <span style={{ marginLeft: "20px", marginRight: "20px" }} >-</span>
                <Form.Item
                  name="IdNumber5"
                  rules={[{ required: false, message: 'Citizen ID' }]}
                >
                  <Input
                    ref={IdNumber5}
                    className="citizenId"
                    maxLength={1}
                    style={{ width: "40px" }}
                    onChange={() => onInputIdNumberChange(IdNumber4, IdNumber5, null)}
                    autoComplete="off"

                  />
                </Form.Item>
              </Row>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Gender' }]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="Unsex">Unsex</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label="Mobile Phone"
                name="PhoneNumberCountry"
                rules={[{ required: true, message: 'Mobile Phone number Country' }]}
              >
                <Select placeholder="Mobile Phone">
                  <Option value="+66">
                    <Image
                      aria-hidden
                      src={thaiLandPic}
                      alt=""
                      width={20}
                      height={16}
                    />
                    +66
                  </Option>
                  <Option value="+1">
                    <Image
                      aria-hidden
                      src={AmericanPic}
                      alt=""
                      width={20}
                      height={16}
                    />
                    +1
                  </Option>
                  <Option value="+33">
                    <Image
                      aria-hidden
                      src={FrenchPic}
                      alt=""
                      width={20}
                      height={16}
                    />
                    +33
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: 'flex', alignItems: 'normal', justifyContent: 'center' }}>
              <span>-</span>
            </Col>
            <Col span={8}>
              <Form.Item
                name="PhoneNumber"
                rules={[{ required: true, message: 'Mobile Phone number' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item
                label="Passport"
                name="passport"
                rules={[{ required: false, message: 'Passport' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                label="Salary Expectations"
                name="salaryExpectations"
                rules={[{ required: true, message: 'Salary Expectations' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: "240px" }}>
              <Form.Item>
                <Button htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: "80px" }}>
              <Form.Item>
                <Button onClick={handleClear}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.tableContent} >
        <div style={{ marginBottom: "20px" }}>
          <Checkbox
            checked={selectAllChecked}
            onChange={specialSelecAll}
          >
            Select All
          </Checkbox>

          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete Selected</Button>
          </Popconfirm>
        </div>
        <Table
          dataSource={customerList}
          rowSelection={rowSelection}
          columns={columns}
          pagination={{
            position: ["topRight"],
            itemRender,
            pageSize: 3
          }} />
      </div>

    </div>
  );
}
