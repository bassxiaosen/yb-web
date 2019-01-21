import React, { Component } from 'react';
import { Card, Pagination, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export default class CourseCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArr: [
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
      ],
    };
  }
  render() {
    const { coursesArr } = this.state;
    const cardStyle = { marginBottom: '24px' };
    return (
      <PageHeaderWrapper>
        <div style={{ minHeight: '800px' }}>
          <Row gutter={24}>
            {coursesArr.map(item => (
              <Col span={8}>
                <Card style={cardStyle} hoverable title={item.name}>
                  <p>班级：{item.class}</p>
                  <p>人数：{item.totalNum}</p>
                  <p>任课时段：{item.date}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}
