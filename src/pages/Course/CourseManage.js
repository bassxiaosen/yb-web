import React, { PureComponent, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';

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
  Upload
} from 'antd';
import styles from './styles.less';
import EditCourse from './EditCourse';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class CourseManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '111',
          courseName: 'C语言',
          academy: '医学信息工程学院',
          teacher: '张三',
          className: '15医工计算机4',
          courseTime: '2015上',
          stuTotal: '88'
        },
        {
          id: '222',
          courseName: '中医药概论',
          academy: '中药学院',
          teacher: '李四',
          className: '15中药药剂学4',
          courseTime: '2015下',
          stuTotal: '99'
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
    if (Object.keys(record).length === 0) {
      ref.setFieldsValue({});
      this.setState({ current: record, visible: true });
    } else {
      //拷贝对象，并将日期转化为Moment对象
      const copy = Object.assign({}, record);
      const { time } = copy;
      let timeArr = time.map(item => moment(item));
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

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const { data, currentPage } = this.state;
    const columns = [
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'name',
        render: (text, record) => (
          <Link to={`courseManage/courseDetail/${record.id}`}>{record.courseName}</Link>
        ),
      },
      { title: '课程所属学院', dataIndex: 'academy', key: 'academy' },
      { title: '上课班级', dataIndex: 'className', key: 'className' },
      { title: '任教老师', dataIndex: 'teacher', key: 'teacher' },
      { title: '课程时间', dataIndex: 'courseTime', key: 'courseTime' },
      { title: '课程人数', dataIndex: 'stuTotal', key: 'stuTotal' },
      // { title: '上课人数', dataIndex: 'renshu', key: 'renshu' },
      // {
      //   title: '开课时间',
      //   dataIndex: 'time',
      //   key: 'number',
      //   render: (text, record) => {
      //     const { start, end } = record.time;
      //     return (
      //       <span>
      //         {moment(start).format('YYYY/MM/DD')} - {moment(end).format('YYYY/MM/DD')}
      //       </span>
      //     );
      //   },
      // },
      // {
      //   title: '教师',
      //   dataIndex: 'teacher',
      //   key: 'course',
      //   render: (text, record) => (
      //     <span>{Array.isArray(record.teacher) ? record.teacher.join('，') : record.teacher}</span>
      //   ),
      // },
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
                  添加课程
                </Button>
              </Col>
              <Col span={4}>
                <Upload>
                  <Button>
                    <Icon type="upload" /> 批量导入
                  </Button>
                </Upload>
              </Col>
              <Col span={8}>
                <Input placeholder="输入课程名称进行查询" allowClear />
              </Col>
              <Col span={8}>
                <Input placeholder="输入课程时间进行查询" allowClear />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={4}>
                <Button type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
              <Col span={6}>
                <Input placeholder="输入上课班级查询" allowClear />
              </Col>
              <Col span={6}>
                <Select style={{ width: '100%' }} allowClear placeholder="选择学院">
                  <Option value="123asf">医工</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Input placeholder="输入教师工号" allowClear />
              </Col>
              <Col span={4}>
                <Input placeholder="输入教师名称" allowClear />
              </Col>
            </Row>
          </div>

          <Table
            pagination={pagination}
            rowKey={record => record.id}
            dataSource={data}
            columns={columns}
          />
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
