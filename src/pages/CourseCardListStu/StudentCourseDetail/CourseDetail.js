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
import styles from './styles.less';
import router from 'umi/router';
import { ChartCard } from "@/components/Charts"
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
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"
import { getDayTime, getRangeTime } from "@/utils/gettime"

const Search = Input.Search;
// function parseState(state) {
//   switch (state) {
//     case 1:
//       return '签到成功'
//     case 2:
//       return '迟到'
//     case 3:
//       return '请假'
//     case 4:
//       return '旷课'
//     case 5:
//       return '签到成功（定位失败）'
//     case 6:
//       return '迟到（未开启定位）'
//   }
// }
function parseState(state) {
  switch (state) {
    case 0:
      return '待签到'
    case 1:
      return '已签到'
    case 2:
      return '请假'
    case 3:
      return '旷课'
  }
}
export default class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          startDate: '2019-04-10 15:00',
          state: 1,
        },
        {
          startDate: '2019-04-15 15:00',
          state: 2
        }
      ],
      visible: false,
      current: {},
      currentPage: 1,
      total: 0,
      loading: false,
      courseDetailData: {
        name: '',
        teacherTruename: '',
        giveDate: '',
        academyName: '',
        studentCount: 0,
        className: '',
        teacher: {},
        academy: {},
        classs: {}
      },
      courseAttendanceData: {
        totalAttendanceNum: 0,
        totalAttendanceRate: 0,
      },
      personAttendanceData: {
        attendanceCount: 0,
        attendanceRate: 0
      },
      totalRate: 0,
      rateVisible: []
    };
    this.modalForm = React.createRef();
  }

  async componentDidMount() {
    this.getCourseDetailData()
    this.getCourseAttendanceData()
    this.getPersonalAttendanceData()
    // 500等放通
    // this.getCourseStudent()
    // this.getCheckInRate()
    // this.getCheckInRateVisible()
  }

  getCourseDetailData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/course/${courseId}`, { method: 'GET' })
    .then((response) => {
      const { data } = response
      this.setState({
        courseDetailData: data
      })
    })
    .catch((err) => {
      message.error('获取课程详情数据失败')
      console.log('err', err)
    })
  }

  getPersonalAttendanceData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/attendance/queryAttendanceCountAndRateOfStudent/${courseId}/${localStorage.getItem('userId')}`, { method: 'POST' })
    .then((response) => {
      const { data } = response
      this.setState({
        personAttendanceData: data
      })
    })
    .catch((err) => {
      message.error('获取个人考勤数据失败')
      console.log('err', err)
    })
  }

  getCourseAttendanceData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/attendance/queryAttendanceCountAndRateOfCourse/${courseId}`, { method: 'POST' })
    .then((response) => {
      const { data } = response
      this.setState({
        courseAttendanceData: data
      })
    })
    .catch((err) => {
      message.error('获取考勤数据失败')
      console.log('err', err)
    })
  }

  getCourseStudent = () => {
    this.setState({
      loading: true,
    })
    const { courseId } = this.props.match.params
    const { studentNum, currentPage, truename, sortField, direction } = this.state
    return request(`${url}/attendance/queryAttendancesOfStudent/${currentPage}/10`,
    {
      method: 'POST',
      body: {
        sortField: 'startDate',
        direction: 2,
        course: {
          courseId,
        },
        student: {
          studentId: localStorage.getItem('userId')
        }
      }
    })
    .then((response) => {
      const { data: { content }, totalElements } = response
      this.setState({
        data: content,
        total: totalElements,
        loading: false,
      })
    })
    .catch((err) => {
      message.error('获取学生数据失败')
      console.log('err', err)
    })
  }

  getCheckInRate() {
    const [ startTime, endTime ] = getRangeTime(6)
    const { courseId } = this.props.match.params
    return request(`${url}/attendance/displayAttendanceRate/${courseId}`, {
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

  async getCheckInRateVisible() {
    const { courseId } = this.props.match.params
    for(let i = 6; i >= 0; i--) {
      const [ startTime, endTime ] = getDayTime(i)
      await request(`${url}/attendance/displayAttendanceRate/${courseId}`, {
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

  handleSearch = () => {
    console.log('搜索');
  };

  render() {
    const {
      data,
      currentPage,
      total,
      loading,
      courseDetailData: {
        name,
        teacherTruename,
        className,
        giveDate,
        studentCount,
        academyName,
        teacher, academy, classs
      },
      courseAttendanceData: {
        totalAttendanceNum, totalAttendanceRate
      },
      personAttendanceData: {
        attendanceCount,
        attendanceRate
      },
      totalRate, rateVisible
    } = this.state;
    const { match } = this.props;
    const dataV = [
      {
        year: "2019-4-15",
        value: 85
      },
      {
        year: "2019-4-16",
        value: 90
      },
      {
        year: "2019-4-17",
        value: 95
      },
      {
        year: "2019-4-18",
        value: 90
      },
      {
        year: "2019-4-19",
        value: 90
      },
      {
        year: "2019-4-20",
        value: 85
      },
      {
        year: "2019-4-21",
        value: 80
      },
    ];
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    const columns = [
      {
        dataIndex: 'startDate',
        key: 'startDate',
        title: '考勤时间',
      },
      {
        dataIndex: 'state',
        key: 'state',
        title: '考勤状态',
        render: (text, record) => (
          <span>
            {parseState(text)}
          </span>
        )
      },
      // {
      //   dataIndex: 'subject',
      //   key: 'subject',
      //   title: '学生班级',
      // },
      // {
      //   key: 'operation',
      //   title: '操作',
      //   render: (text, record) => (
      //     <span>
      //       <a onClick={this.openModal.bind(this, record)}>修改</a>
      //       <Divider type="vertical" />
      //       <Popconfirm
      //         title="确认删除此学生？"
      //         onConfirm={this.onClickDelete.bind(this, record.id)}
      //       >
      //         <a href="javascript:;">删除</a>
      //       </Popconfirm>
      //     </span>
      //   ),
      // },
    ];
    const pagination = {
      current: currentPage,
      pageSize: 10,
      total,
      onChange: page => {
        this.setState({ currentPage: page }, () => {
          this.getCourseStudent()
        });
      },
    };

    return (
      <PageHeaderWrapper title="课程详情">
        <Card>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程名称：{name}</Col>
              <Col span={6}>任课教师：{teacher.truename}</Col>
              <Col span={6}>开课时间：{giveDate}</Col>
              <Col span={6}>课程所属学院：{academy.name}</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程总人数：{classs.studentCount}人</Col>
              <Col span={6}>上课班级：{classs.name}</Col>
              <Col span={6}>总考勤次数：{totalAttendanceNum}次</Col>
              <Col span={6}>个人出勤次数：{attendanceCount}次</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={6}>课程平均出勤率：{totalAttendanceRate}%</Col>
              <Col span={6}>个人出勤率：{attendanceRate}%</Col>
            </Row>
          </div>
          <div className={styles.header}>
            <Row>
              <Col span={24}>
                <ChartCard
                  title="课程出勤率"
                  total={`平均：${totalRate}%`}
                  action={
                    <div>
                      <a>周</a>/
                      <a>月</a>/
                      <a>半年</a>
                    </div>
                  }
                >
                  <Chart height={400} data={rateVisible} scale={cols} forceFit>
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
          </div>
          {/* <div className={styles.header}>
            <Row gutter={24}>
              <Col span={8}>
                <Input placeholder="输入学号搜索" />
              </Col>
              <Col span={8}>
                <Input placeholder="输入姓名搜索" />
              </Col>
              <Col span={8}>
                <Button type="primary" onClick={this.handleSearch}>
                  查询
                </Button>
              </Col>
            </Row>
          </div> */}
          <Table
            columns={columns}
            pagination={pagination}
            dataSource={data}
            loading={loading}
            rowKey={record => record.startDate}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
