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

  render() {
    const { data } = this.state;
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

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.header}>
            <Row>
              <Col span={8}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加教师
                </Button>
              </Col>
              <Col span={8}>
                <Search enterButton placeholder="输入姓名或工号进行查询" />
              </Col>
            </Row>
          </div>

          <Table rowKey={record => record.id} dataSource={data} columns={columns} />
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
