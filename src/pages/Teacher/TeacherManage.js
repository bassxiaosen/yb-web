import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Table,
  Popconfirm,
} from 'antd';
import styles from './TeacherManage.less';
import EditTeacher from './EditTeacher';

const { Search } = Input;
const { Option } = Select

class TeacherManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '111',
          name: '某教师',
          academy: '医学信息工程学院',
          jobNumber: '20000000',
          course: 'C语言',
          password: '123123',
        },
        {
          id: '222',
          name: '二教师',
          academy: '医学信息工程学院',
          jobNumber: '20000001',
          course: 'C++语言',
          password: '123123',
        },
      ],
      visible: false,
      current: {},
      currentPage: 1,
    };
    this.modalForm = React.createRef();
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openModal = record => {
    const ref = this.modalForm.current;
    ref.setFieldsValue(record);
    this.setState({ current: record, visible: true });
  };

  handleOk = value => {
    console.log(value);
  };

  onClickDelete = id => {
    message.success(`删除教师id：${id}`);
  };

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const { data, currentPage } = this.state;
    const columns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '学院', dataIndex: 'academy', key: 'academy' },
      { title: '工号', dataIndex: 'jobNumber', key: 'number' },
      { title: '负责课程', dataIndex: 'course', key: 'course' },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此教师？"
              onConfirm={this.onClickDelete.bind(this, record.id)}
            >
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total: 100,
      onChange: page => {
        this.setState({ currentPage: page });
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row gutter={24} style={{ marginBottom: '16px' }}>
              <Col span={4}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加教师
                </Button>
              </Col>
              <Col span={8} offset={2}>
                <Input enterButton placeholder="输入姓名进行查询" />
              </Col>
              <Col span={8} offset={2}>
                <Input enterButton placeholder="输入工号进行查询" />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
              <Col span={8} offset={2}>
                <Select style={{ width: '100%' }} allowClear placeholder="选择学院">
                  <Option value="123asf">医工</Option>
                </Select>
              </Col>
              <Col span={8} offset={2}>
                <Input enterButton placeholder="输入课程名称进行查询" />
              </Col>
            </Row>
          </div>

          <Table rowKey={record => record.id} dataSource={data} columns={columns} pagination={pagination}/>
        </Card>
        <EditTeacher
          ref={this.modalForm}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          visible={this.state.visible}
          current={this.state.current}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TeacherManage;
