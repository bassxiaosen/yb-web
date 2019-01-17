import React, { Component } from 'react';
import { Card, Table, Row, Col, Input, Button, Upload, Icon, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
const Search = Input.Search;
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: '周嘉炜',
          number: '2015081055',
          academy: '医学信息工程学院',
          subject: '计算机科学与技术',
        },
      ],
    };
  }
  render() {
    const { data } = this.state;
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
            <a href="javascript:;">修改</a>
            <Divider type="vertical" />
            <a href="javascript:;">删除</a>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
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
                <Button type="primary">添加学生</Button>
              </Col>
              <Col span={6}>
                <Upload>
                  <Button>
                    <Icon type="upload" />
                    导入学生Excel
                  </Button>
                </Upload>
              </Col>
              <Col span={6}>
                <Search enterButton placeholder="输入学号行搜索" />
              </Col>
            </Row>
          </div>
          <Table columns={columns} dataSource={data} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
