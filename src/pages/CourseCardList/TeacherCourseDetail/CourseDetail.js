import React, { Component } from 'react';
import {
  Card,
  Table,
  Row,
  Col,
  Input,
  Button,
  Upload,
  Icon,
  Divider,
  Popconfirm,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditCourseDetail from './EditCourseDetail';
import styles from './styles.less';
import router from 'umi/router';
const Search = Input.Search;
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '2015081055',
          name: '某某某',
          number: '2015081000',
          academy: '医学信息工程学院',
          subject: '计算机科学与技术',
        },
      ],
      visible: false,
      current: {},
      currentPage: 2,
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
    message.success(`删除学生id：${id}`);
  };

  render() {
    const { data, currentPage } = this.state;
    const { match } = this.props;
    const columns = [
      {
        dataIndex: 'name',
        key: 'name',
        title: '姓名',
      },
      {
        dataIndex: 'number',
        key: 'number',
        title: '学号',
      },
      {
        dataIndex: 'subject',
        key: 'subject',
        title: '专业',
      },
      {
        dataIndex: 'academy',
        key: 'academy',
        title: '学院',
      },
      {
        key: 'operation',
        title: '操作',
        render: (text, record) => (
          <span>
            <a onClick={this.openModal.bind(this, record)}>修改</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确认删除此学生？"
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
      <PageHeaderWrapper title="课程详情">
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程名称：HTML5程序设计</Col>
              <Col span={6}>任课教师：某教师</Col>
              <Col span={6}>开课时间：2018-9——2019-1</Col>
              <Col span={6}>课程总学生人数：65人</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>
                <Button type="primary" onClick={this.openModal.bind(this, {})}>
                  添加学生
                </Button>
              </Col>
              {/* <Col span={6}>
                <Upload>
                  <Button>
                    <Icon type="upload" />
                    导入学生Excel
                  </Button>
                </Upload>
              </Col> */}
              <Col span={6}>
                <Search enterButton placeholder="输入学号行搜索" />
              </Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => {
                    router.push(`${match.path}/checkIn`);
                  }}
                >
                  前往签到
                </Button>
              </Col>
              <Col span={6}>总考勤次数：6次</Col>
              <Col span={6}>平均出席率：86%</Col>
            </Row>
          </div>
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={data}
            rowKey={record => record.number}
          />
        </Card>
        <EditCourseDetail
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
