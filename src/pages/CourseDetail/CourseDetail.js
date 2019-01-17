import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

export default class CourseDetail extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Card>课程详情</Card>
      </PageHeaderWrapper>
    );
  }
}
