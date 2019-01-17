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
import styles from './styles.less';
import EditCourse from './EditCourse';

const { Search } = Input;

class CourseManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '111',
          courseName: 'C语言',
          academy: '医学信息工程学院',
          time: '2018.09-2019.01',
          teacher: '某教师',
        },
        {
          id: '222',
          courseName: '中医药概论',
          academy: '基础医学院',
          time: '2018.09-2019.01',
          teacher: ['某某教师', '某教师'],
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
    if (Object.keys(record).length === 0) {
      ref.setFieldsValue({});
      this.setState({ current: record, visible: true });
    } else {
      //拷贝对象，并将日期转化为Moment对象
      const copy = Object.assign({}, record);
      const { time } = copy;
      let timeArr = time.split('-');
      timeArr = timeArr.map(item => moment(item));
      copy.time = timeArr;
      ref.setFieldsValue(copy);
      this.setState({ current: copy, visible: true });
    }
  };

  handleOk = value => {
    console.log(value);
  };

  onClickDelete = id => {
    message.success(`删除课程id：${id}`);
  };

  render() {
    const { data } = this.state;
    const columns = [
      { title: '课程名称', dataIndex: 'courseName', key: 'name' },
      { title: '学院', dataIndex: 'academy', key: 'academy' },
      { title: '时间', dataIndex: 'time', key: 'number' },
      {
        title: '教师',
        dataIndex: 'teacher',
        key: 'course',
        render: (text, record) => (
          <span>{Array.isArray(record.teacher) ? record.teacher.join('，') : record.teacher}</span>
        ),
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此课程？"
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
                  添加课程
                </Button>
              </Col>
              <Col span={8}>
                <Search enterButton placeholder="输入课程名称进行查询" />
              </Col>
            </Row>
          </div>

          <Table rowKey={record => record.id} dataSource={data} columns={columns} />
        </Card>
        <EditCourse
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

export default CourseManage;
