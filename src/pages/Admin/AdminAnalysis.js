import React, { Component } from 'react';
import { Row, Col, Icon, Table, message } from 'antd';
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  Bar,
  TimelineChart,
} from '@/components/Charts';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import moment from 'moment';
import request from '@/utils/request'
import url from "@/utils/url"
import { getRangeTime, getDayTime } from "@/utils/gettime"

export default class AdminAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      countVisible: [],
      currentPage: 2,
      tableData: [
        {
          courseName: 'C语言',
          rate: '99%'
        },
        {
          courseName: 'Go语言',
          rate: '98%'
        }
      ]
    };
  }

  getCheckInCount() {
    const [ startTime, endTime ] = getRangeTime(6)
    return request(`${url}/attendance/displayAttendanceUsed`, {
      method: 'POST',
      body: {
        startTime, endTime
      }
    }).then((res) => {
      const { data } = res
      this.setState({
        totalCount: data
      })
    }).catch((err) => {
      console.log(err)
      message.error('获取考勤次数统计失败')
    })
  }

  async getCheckInCountVisible() {
    for(let i = 6; i >= 0; i--) {
      const [ startTime, endTime ] = getDayTime(i)
      await request(`${url}/attendance/displayAttendanceUsed`, {
        method: 'POST',
        body: {
          startTime, endTime
        }
      }).then((res) => {
        const dateStr = startTime.substr(0, 10)
        const { countVisible } = this.state
        // console.log(res)
        this.setState({
          countVisible: countVisible.concat({
            x: dateStr,
            y: res.data
          })
        })
      }).catch(err => {
        console.log(err)
        message.error('获取考勤次数失败')
      })
    }
  }

  async componentDidMount() {
    this.getCheckInCount()
    this.getCheckInCountVisible()
  }

  render() {
    const { tableData, currentPage, totalCount, countVisible } = this.state;
    const dataV = [
      {
        year: "1991",
        value: 3
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      },
      {
        year: "1995",
        value: 4.9
      },
      {
        year: "1996",
        value: 6
      },
      {
        year: "1997",
        value: 7
      },
      {
        year: "1998",
        value: 9
      },
      {
        year: "1999",
        value: 13
      }
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    }
    const columns = [
      {
        dataIndex: 'courseName',
        key: 'courseName',
        title: '课程名称',
      },
      {
        dataIndex: 'rate',
        key: 'rate',
        title: '平均出勤率',
      }
    ]
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total: 100,
      onChange: page => {
        this.setState({ currentPage: page });
      },
    }
    return (
      <div>
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <ChartCard
              title="教师考勤次数"
              // action={
              //   <div>
              //     <a>周</a>/
              //     <a>月</a>/
              //     <a>半年</a>
              //   </div>
              // }
              total={`${numeral(totalCount).format('0,0')}`}
              // footer={<Field label="日考勤次数" value={numeral(50).format('0,0')} />}
              contentHeight={200}
            >
              <Bar height={200} data={countVisible} />
            </ChartCard>
          </Col>
        </Row>
        <Row style={{ marginBottom: '24px' }}>
          <Col span={24}>
            <ChartCard
              title="课程出勤率"
              total={`平均：${90}%`}
              // action={
              //   <div>
              //     <a>周</a>/
              //     <a>月</a>/
              //     <a>半年</a>
              //   </div>
              // }
            >
              <Chart height={400} data={dataV} scale={cols} forceFit>
                  <Axis name="year" />
                  <Axis name="value" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="line" position="year*value" size={2} />
                  <Geom
                    type="point"
                    position="year*value"
                    size={4}
                    shape={"circle"}
                    style={{
                      stroke: "#fff",
                      lineWidth: 1
                    }}
                  />
                </Chart>
            </ChartCard>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ChartCard
              title="课程出勤率排行"
              // action={
              //   <div>
              //     <a>周</a>/
              //     <a>月</a>/
              //     <a>半年</a>
              //   </div>
              // }
            >
              <Table
                columns={columns}
                pagination={pagination}
                dataSource={tableData}
                rowKey={record => record.courseName}
              />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}
