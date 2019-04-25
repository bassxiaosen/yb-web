import React, { Component } from 'react';
import { Card, Layout, message, Button, Switch, InputNumber } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';
import HistorySider from './components/HistorySider/index';
import CheckInArea from './components/CheckInArea/index';
import CheckInResult from './components/CheckInResult/index';
import qs from 'qs'
import request from "@/utils/request"
import url from "@/utils/url"

const { Sider, Content } = Layout;

export default class CheckIn extends Component {
  constructor(props) {
    super(props);
    const targetTime = new Date().getTime();
    this.state = {
      isInit: true, //是否初始化了页面，显示倒计时器，初始化endCount的调用，删除了签到记录后，重设这玩意
      isGPS: true,
      newCheckIn: false, // 控制开启签到按钮状态
      visibleCheckPage: true, // false查看结果 true为定时器与二维码区域
      checkInQRCodeID: '',
      checkInMin: 5,
      targetTime,
      //初始时以下数据为空数组，即长度为0
      checkInStudent: [],
      // 历史签到详情数据
      historyData: [
        {
          id: '1',
          date: '2019-04-15',
          data: [
            { checkInId: '1hasaggjiuia9835', time: '14:33', checkInNum: 30, rate: '50%' },
            { checkInId: '2ashihgayg875478', time: '17:33', checkInNum: 32, rate: '52%' },
          ],
        },
        {
          id: '2',
          date: '2019-04-13',
          data: [
            { checkInId: '1iausgiugag786387', time: '09:33', checkInNum: 60, rate: '100%' },
            { checkInId: '2ajhhguiauh845934', time: '13:20', checkInNum: 50, rate: '83%' },
          ],
        },
      ],

      //结果页数据
      noCheckInStudent: [{ name: '缺勤1', id: '1' }, { name: '缺勤2', id: '2' }],

      historyLoading: false,
      buttonLoading: false,
      areaLoading: true,

      // 哪一节课的id
      sectionId: '',

      currentPage: 1,
      total: 0,
      detailData: [],
      courseDetailData: {}
    };
  }

  async componentDidMount() {
    // await this.getCourseDetailData()
    // await this.getHistoryData()
  }

  getInitCourseAttendacne = () => {
    const { courseId } = this.props.params
    return request(`${url}/attendance/initAttendancesOfSection/${courseId}`, {
      method:' GET'
    }).then((response) => {
      const { data: {sectionId} } = response
      this.setState({
        checkInQRCodeID: sectionId,
        sectionId
      })
    }).catch(err => {
      message.error('开启考勤失败')
      this.setState({
        newCheckIn: false,
        visibleCheckPage: true
      })
      throw new Error('fail')
    })
  }

  getCourseDetailData = () => {
    const { courseId } = this.props.match.params
    return request(`${url}/course/${courseId}`, { method: 'GET' })
    .then((response) => {
      const { data: { content } } = response
      this.setState({
        courseDetailData: content
      })
    })
    .catch((err) => {
      message.error('获取课程详情数据失败')
      console.log('err', err)
    })
  }

  getHistoryData = () => {
    this.setState({
      historyLoading: true
    })
    const { courseId } = this.props.match.params
    return request(`${url}/attendance/queryAttendancesOfCourse/1/10000`,{
      method: 'POST',
      body: {
        courseId,
        sortBystartDate: -1
      }
    }).then((response) => {
      const { data: {content} } = response
      this.setState({
        historyData: content,
        historyLoading: false
      })
    }).catch(err => {
      message.error('获取历史数据失败')
    })
  }

  getAttendanceDetail = () => {
    const { sectionId, currentPage } = this.state
    return request(`${url}/attendance/queryAttendancesOfSection/${sectionId}/${currentPage}/10`, {
      method: 'POST',
      body: {
        sectionId,
        sortField: 'studentNum',
        direction: 1
      }
    }).then(response => {
      const {data: {content}} = response
      this.setState({ detailData: content })
    }).catch(err => {
      message.error('获取考勤结果失败')
    })
  }

  deleteAttendanceData = () => {
    this.setState({ historyLoading: true })
    const { sectionId } = this.state
    return request(`${url}/deleteAttendancesOfSection/${sectionId}`, {
      method: 'DELETE'
    }).then((response) => {
      message.success('删除成功')
      this.setState({
        visibleCheckPage: true,
        newCheckIn: false,
      })
    }).catch(err => {
      message.error('删除失败')
    })
  }

  handleChangeDetailPage = (page) => {
    this.setState({currentPage: page})
    this.getAttendanceDetail()
  }

  handleDeleteAttendance = () => {
    // await this.deleteAttendanceData()
    // await this.getHistoryData()
  }

  handleClickSiderHistory = checkInId => {
    this.setState(
      {
        visibleCheckPage: false, // 看结果
        newCheckIn: false,
        currentPage: 1, // 重回第一页
        sectionId: checkInId
      },
      () =>{
        console.log(this.state.newCheckIn, this.state.visibleCheckPage)
        // this.getAttendanceDetail()
      }
    );
    message.success(checkInId);
  };

  handleChangeGPS = checked => {
    this.setState({ isGPS: checked }, () => console.log(this.state.isGPS));
  };

  handleChangeCheckInMin = value => {
    this.setState({
      checkInMin: value,
    });
  };

  handleOpenNewCheckIn = async () => {
    this.setState({
      buttonLoading: true,
    })
    try {
      // await this.getInitCourseAttendacne()
    } catch(e) {
      return false
    }
    console.log(this.state.newCheckIn);
    const min = this.state.checkInMin;
    const targetTime = new Date().getTime() + min * 60 * 1000;
    this.setState(
      {
        targetTime,
        checkInQRCodeID: 'adgo83760asahiua', // 等接口放通
        newCheckIn: true,
        visibleCheckPage: true,
        checkInStudent: [],
      },
      () => console.log(this.state.newCheckIn, this.state.visibleCheckPage)
    );
    //开启签到后，要定时的发请求给后端，即轮询查找哪些学生已经签到。 这里是通过定时器造假数据
    let num = 1;
    window.checkInTimer = window.setInterval(() => {
      const { checkInStudent } = this.state;
      this.setState(
        {
          checkInStudent: checkInStudent.concat({ name: `学生${num}`, id: `${num}` }),
        },
        () => {
          num = num + 1;
        }
      );
    }, 2000);
  };

  handleEndCheckIn = async isManual => {
    //签到结束后，应该去除二维码，显示签到结果，重设二维码
    // 调用两个接口一个获取历史签到数据一个本次考勤数据
    window.clearInterval(window.checkInTimer);
    if (isManual) {
      const targetTime = new Date().getTime() - 1000;
      this.setState({
        targetTime,
        newCheckIn: false,
        visibleCheckPage: false, // 签到结束后要去签到结果页看结果 fasle查看结果
        checkInQRCodeID: '',
        buttonLoading: false,
        currentPage: 1, // 重回第一页
      });
      // await this.getHistoryData()
      // await this.getAttendanceDetail()
      return console.log('手动结束');
    } else if (isManual === false) {
      if (this.state.isInit) { // 初始化时不执行过任何业务操作
        this.setState({ isInit: false });
      } else {
        this.setState({ newCheckIn: false, visibleCheckPage: false, checkInQRCodeID: '', buttonLoading: false, currentPage: 1 });
        // await this.getHistoryData()
        // await this.getAttendanceDetail()
        console.log('自动结束');
      }
    }
  };

  render() {
    const {
      historyData,
      isGPS,
      newCheckIn,
      visibleCheckPage,
      checkInQRCodeID,
      checkInMin,
      targetTime,
      checkInStudent,
      noCheckInStudent,
      historyLoading,
      buttonLoading,
      currentPage,
      total,
      detailData
    } = this.state;
    const myStyles = {
      startCheckArea: {
        border: '2px dashed #c8c8c8',
        backgroundColor: '#f2f2f2',
        padding: '10px 8px',
        marginBottom: '10px',
        marginLeft: '12px',
        marginRight: '12px',
        textAlign: 'center',
      },
    };

    return (
      <PageHeaderWrapper>
        <Card>
          <Layout>
            <Sider className={styles.checkInSider}>
              <header className={styles.siderHeader}>课程总人数：60人</header>
              <div style={myStyles.startCheckArea}>
                {newCheckIn ? (
                  '签到中'
                ) : (
                  <>
                    <Button
                      onClick={this.handleOpenNewCheckIn}
                      style={{ marginBottom: '10px' }}
                      icon="plus"
                      type="primary"
                      disabled={buttonLoading}
                    >
                      开启新签到
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Switch
                        onChange={this.handleChangeGPS}
                        style={{ marginBottom: '10px' }}
                        checked={isGPS}
                      />{' '}
                      启用定位
                    </div>
                    <InputNumber
                      onChange={this.handleChangeCheckInMin}
                      value={checkInMin}
                      size="small"
                      min={0}
                      max={60}
                    />{' '}
                    分钟
                  </>
                )}
              </div>
              <HistorySider
                handleClickSiderHistory={this.handleClickSiderHistory}
                historyData={historyData}
                loading={historyLoading}
              />
            </Sider>
            <Content>
              {visibleCheckPage ? (
                <CheckInArea
                  checkInQRCodeID={checkInQRCodeID}
                  targetTime={targetTime}
                  checkInStudent={checkInStudent}
                  handleEndCheckIn={this.handleEndCheckIn}
                />
              ) : (
                <CheckInResult
                  checkInStudent={checkInStudent}
                  noCheckInStudent={noCheckInStudent}
                  handleDeleteAttendance={this.handleDeleteAttendance}
                  detailData={detailData}
                  currentPage={currentPage}
                  total={total}
                  handleChangeDetailPage={this.handleChangeDetailPage}
                />
              )}
            </Content>
          </Layout>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
