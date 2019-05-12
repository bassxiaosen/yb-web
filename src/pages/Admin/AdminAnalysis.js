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
      totalRate: 0,
      rateVisible: [{
        date: '2019-05-06',
        value: 50
      },{
        date: '2019-05-07',
        value: 60
      },{
        date: '2019-05-08',
        value: 0
      },{
        date: '2019-05-09',
        value: 80
      },{
        date: '2019-05-10',
        value: 90
      },{
        date: '2019-05-11',
        value: 100
      },{
        date: '2019-05-12',
        value: 40
      }],
      currentPage: 1,
      total: 0,
      loading: true,
      tableData: [
      ]
    };
  }

  getAttendanceRateOfCourses = () => {
    const [ startTime, endTime ] = getRangeTime(6)
    const { currentPage } = this.state
    this.setState({loading: true})
    return request(`${url}/attendance/queryAttendanceRateOfCourses/${currentPage}/10`, {
      method: 'POST',
      body: {
        startTime, endTime, sortByAttendanceRate: -1
      }
    }).then(res => {
      const { data: {content, pageable: {totalElements}} } = res
      this.setState({
        tableData: content,
        total: totalElements,
        loading: false
      })
    }).catch(err => {
      console.log(err)
      message.error('获取课程出勤率失败')
    })
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

  getCheckInRate() {
    const [ startTime, endTime ] = getRangeTime(6)
    return request(`${url}/attendance/displayAttendanceRate`, {
      method: 'POST',
      body: {
        startTime, endTime
      }
    }).then((res) => {
      const { data } = res
      this.setState({
        totalRate: data
      })
    }).catch((err) => {
      console.log(err)
      message.error('获取总出勤率失败')
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

  async getCheckInRateVisible() {
    for(let i = 6; i >= 0; i--) {
      const [ startTime, endTime ] = getDayTime(i)
      await request(`${url}/attendance/displayAttendanceRate`, {
        method: 'POST',
        body: {
          startTime, endTime
        }
      }).then((res) => {
        const dateStr = startTime.substr(0, 10)
        const { rateVisible } = this.state
        // console.log(res)
        this.setState({
          rateVisible: rateVisible.concat({
            date: dateStr,
            value: res.data
          })
        })
      }).catch(err => {
        console.log(err)
        message.error('获取出勤率失败')
      })
    }
  }

  async componentDidMount() {
    this.getAttendanceRateOfCourses()
    this.getCheckInCount()
    this.getCheckInCountVisible()
    // this.getCheckInRate()
    // this.getCheckInRateVisible()
  }

  render() {
    const { tableData, loading, currentPage, total, totalCount, countVisible, totalRate, rateVisible } = this.state;
    const dataV = [
      {
        date: "2019-4-15",
        value: 85
      },
      {
        date: "2019-4-16",
        value: 90
      },
      {
        date: "2019-4-17",
        value: 95
      },
      {
        date: "2019-4-18",
        value: 90
      },
      {
        date: "2019-4-19",
        value: 90
      },
      {
        date: "2019-4-20",
        value: 85
      },
      {
        date: "2019-4-21",
        value: 80
      },
      {
        date: "2019-4-22",
        value: 85
      },
      {
        date: "2019-4-24",
        value: 85
      },
      {
        date: "2019-4-25",
        value: 85
      },
      {
        date: "2019-4-26",
        value: 85
      },
      {
        date: "2019-4-27",
        value: 85
      },
      {
        date: "2019-4-28",
        value: 85
      },
      {
        date: "2019-4-29",
        value: 85
      },
      {
        date: "2019-4-30",
        value: 85
      },
    ];
    const cols = {
      value: {
        alias: '出勤率'
      },
      date: {
        alias: '日期时间'
      }
    };
    const columns = [
      {
        dataIndex: 'courseName',
        key: 'courseName',
        title: '课程名称',
      },
      {
        dataIndex: 'totalAttendanceRate',
        key: 'totalAttendanceRate',
        title: '平均出勤率',
        render: (text, record) =>{
          if (text === '-1') {
            return (
              <span>
                未开启考勤
              </span>
            )
          }
          return (
            <span>
              {`${text}%`}
            </span>
          )
        }
      }
    ]
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total,
      onChange: page => {
        this.setState({ currentPage: page }, () => { this.getAttendanceRateOfCourses() });
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
              total={`平均：${totalRate}%`}
              // action={
              //   <div>
              //     <a>周</a>/
              //     <a>月</a>/
              //     <a>半年</a>
              //   </div>
              // }
            >
              <Chart height={400} data={rateVisible} scale={cols} forceFit>
                  <Axis name="date" />
                  <Axis name="value" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="line" position="date*value" size={1} />
                  <Geom
                    type="point"
                    position="date*value"
                    size={2}
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
                loading={loading}
                columns={columns}
                pagination={pagination}
                dataSource={tableData}
                rowKey={record => record.courseId}
              />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}
