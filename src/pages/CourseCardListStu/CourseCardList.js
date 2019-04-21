import React, { Component } from 'react';
import { Card, Pagination, Row, Col, Input, Select, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const Option = Select.Option
export default class CourseCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      coursesArr: [
        { id: 1, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        {
          id: 2,
          name: 'C++程序设计',
          totalNum: '65',
          class: '15医工计算机',
          date: '2018.9-2019.1',
          teacher: '张三',
          academy: '医工'
        },
        {
          id: 3,
          name: 'Java程序设计',
          totalNum: '65',
          class: '15医工计算机',
          date: '2018.9-2019.1',
        },
        { id: 4, name: 'C#程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 5, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 6, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 7, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
      ],
    };
  }

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const { coursesArr, currentPage } = this.state;
    const { match } = this.props;
    const cardStyle = { marginBottom: '24px' };
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total: 100,
      onChange: page => {
        console.log(page)
        this.setState({ currentPage: page });
      },
    };

    return (
      <PageHeaderWrapper>
        <div style={{ minHeight: '600px' }}>
        <div style={{ marginBottom: '24px' }}>
            <Row style={{ marginBottom: '16px' }} gutter={24}>
              <Col span={5}>
                <Input placeholder="输入课程名称查询" />
              </Col>
              <Col span={5}>
                <Input placeholder="输入任教老师查询" />
              </Col>
              <Col span={5}>
                <Select style={{ width: '100%' }} placeholder="选择学院">
                  <Option value="1">医学信息工程学院</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={this.handleSearch}>搜索</Button>
              </Col>
            </Row>
          </div>
          <Row gutter={24}>
            {coursesArr.map(item => (
              <Col key={item.id} span={6}>
                <Card
                  onClick={() => {
                    router.push(`${match.path}/studentCourseDetail/${item.id}`);
                  }}
                  style={cardStyle}
                  hoverable
                  title={item.name}
                >
                  <p>班级：{item.class}</p>
                  <p>上课人数：{item.totalNum}</p>
                  <p>上课时间：{item.date}</p>
                  <p>任课教师：{item.teacher}</p>
                  <p>所属学院：{item.academy}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Row style={{textAlign: 'right'}}>
            <Pagination
              {...pagination}
            />
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}
