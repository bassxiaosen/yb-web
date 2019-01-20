import React, { Component } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
  TimelineChart,
} from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 900,
  });
}

export default class AdminAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <ChartCard
              title="教师考勤次数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={`${numeral(886).format('0,0')}`}
              footer={<Field label="日考勤次数" value={numeral(50).format('0,0')} />}
              contentHeight={200}
            >
              <Bar height={200} data={visitData} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <ChartCard
              title="总签到次数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={`${numeral(556).format('0,0')}`}
              // footer={<Field label="日考勤次数" value={numeral(50).format('0,0')} />}
              contentHeight={200}
            >
              <Bar height={200} data={visitData} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <ChartCard
              title="日平均出勤率"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={`${numeral(86).format('0,0')}%`}
              // footer={<Field label="日考勤次数" value={numeral(50).format('0,0')} />}
              contentHeight={450}
            >
              <TimelineChart
                height={400}
                data={chartData}
                titleMap={{ y1: '应到人数', y2: '实际签到人数' }}
              />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}
