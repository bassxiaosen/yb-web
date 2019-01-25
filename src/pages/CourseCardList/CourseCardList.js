import React, { Component } from 'react';
import { Card, Pagination, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
export default class CourseCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesArr: [
        { id: 1, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 2, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 3, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 4, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 5, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 6, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
        { id: 7, name: 'C程序设计', totalNum: '65', class: '15医工计算机', date: '2018.9-2019.1' },
      ],
    };
  }
  render() {
    const { coursesArr } = this.state;
    const { match } = this.props;
    const cardStyle = { marginBottom: '24px' };
    return (
      <PageHeaderWrapper>
        <div style={{ minHeight: '600px' }}>
          <Row gutter={24}>
            {coursesArr.map(item => (
              <Col key={item.id} span={6}>
                <Card
                  onClick={() => {
                    router.push(`${match.path}/teacherCourseDetail/${item.id}`);
                  }}
                  style={cardStyle}
                  hoverable
                  title={item.name}
                >
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
